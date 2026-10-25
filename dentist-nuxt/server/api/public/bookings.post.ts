import { randomBytes } from 'node:crypto'
import { bookingSchema, parseBody } from '../../utils/validators'
import { availableSlots, resolveSlot } from '../../utils/schedule'
import { getSettings } from '../../utils/clinic'
import { query } from '../../utils/db'
import { sendSms } from '../../utils/sms'

export default defineEventHandler(async (event) => {
  const b = parseBody(bookingSchema, await readBody(event))
  const allowed = await availableSlots(b.date,b.serviceId)
  if (!allowed.includes(b.time)) throw createError({ statusCode:409, message:'این ساعت دیگر قابل رزرو نیست. ساعت دیگری انتخاب کنید.' })
  const service = (await query('SELECT id,name,duration_minutes FROM services WHERE id=$1 AND is_active=true',[b.serviceId])).rows[0]
  if (!service) throw createError({ statusCode:404, message:'خدمت موردنظر یافت نشد.' })
  const settings = await getSettings()
  const slot = resolveSlot(b.date,b.time,service.duration_minutes,settings.timezone)
  if (!slot) throw createError({ statusCode:422, message:'زمان انتخاب‌شده معتبر نیست.' })
  let saved
  try {
    // The PostgreSQL exclusion constraint is the final concurrency guard.
    const code = randomBytes(6).toString('hex').toUpperCase()
    const result = await query(`INSERT INTO appointments(service_id,patient_name,mobile,notes,start_at,end_at,tracking_code)
      VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING id,tracking_code,status,start_at`,
      [service.id,b.patientName,b.mobile,b.notes,slot.start,slot.end,code])
    saved = result.rows[0]
  } catch(err: any) {
    if(err.code === '23P01') throw createError({ statusCode:409, message:'این ساعت هم‌اکنون توسط بیمار دیگری رزرو شد؛ لطفاً ساعت دیگری انتخاب کنید.' })
    if(err.code === '23505') throw createError({ statusCode:409, message:'خطای موقت در ثبت کد پیگیری؛ دوباره تلاش کنید.' })
    throw err
  }
  const smsSent = await sendSms(b.mobile,`نوبت ${service.name} دکتر آزاده مهرداد در تاریخ ${b.date} ساعت ${b.time} ثبت شد. کد پیگیری: ${saved.tracking_code}`)
  setResponseStatus(event,201)
  return { success:true, code:saved.tracking_code, date:b.date, time:b.time, service:service.name, smsSent }
})

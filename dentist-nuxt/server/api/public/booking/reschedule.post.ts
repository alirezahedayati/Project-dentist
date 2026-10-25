import { z } from 'zod'
import { trackingSchema,parseBody } from '../../../utils/validators'
import { availableSlots,resolveSlot } from '../../../utils/schedule'
import { getSettings } from '../../../utils/clinic'
import { transaction } from '../../../utils/db'
export default defineEventHandler(async(event) => {
  const b = parseBody(trackingSchema.extend({date:z.string().regex(/^\d{4}-\d{2}-\d{2}$/),time:z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/)}),await readBody(event))
  const s = await getSettings()
  const result = await transaction(async client => {
    const old = (await client.query(`SELECT a.id,a.service_id,a.start_at,s.duration_minutes FROM appointments a
      JOIN services s ON s.id=a.service_id WHERE a.tracking_code=$1 AND a.mobile=$2 AND a.status='confirmed' FOR UPDATE OF a`,[b.code,b.mobile])).rows[0]
    if(!old || new Date(old.start_at).getTime()-Date.now() <= s.cancellation_hours*3600000)
      throw createError({statusCode:409,message:'امکان تغییر این نوبت طبق مهلت تعیین‌شده وجود ندارد.'})
    const slots=await availableSlots(b.date,Number(old.service_id),Number(old.id))
    if(!slots.includes(b.time)) throw createError({statusCode:409,message:'زمان جدید آزاد نیست.'})
    const slot=resolveSlot(b.date,b.time,old.duration_minutes,s.timezone)
    if (!slot) throw createError({statusCode:422,message:'زمان نامعتبر است.'})
    await client.query(`UPDATE appointments SET start_at=$1,end_at=$2,updated_at=NOW(),reminder_sent_at=NULL WHERE id=$3`,[slot.start,slot.end,old.id])
    return { success:true,code:b.code,date:b.date,time:b.time }
  }).catch((err:any) => {
    if(err.code==='23P01') throw createError({statusCode:409,message:'زمان موردنظر در همین لحظه رزرو شد.'})
    throw err
  })
  return result
})

import { z } from 'zod'
import { requireAdmin } from '../../../utils/auth'
import { parseBody } from '../../../utils/validators'
import { query,transaction } from '../../../utils/db'
import { getSettings } from '../../../utils/clinic'
import { availableSlots,resolveSlot } from '../../../utils/schedule'
export default defineEventHandler(async event => {
  await requireAdmin(event)
  const id=Number(getRouterParam(event,'id'))
  if(!Number.isInteger(id)||id<=0) throw createError({statusCode:422,message:'شناسه نامعتبر است.'})
  const data=parseBody(z.object({status:z.enum(['confirmed','cancelled','completed','no_show']).optional(),date:z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),time:z.string().regex(/^\d{2}:\d{2}$/).optional()}),await readBody(event))
  if (!data.status && (!data.date || !data.time)) throw createError({statusCode:422,message:'وضعیت یا تاریخ و ساعت جدید را انتخاب کنید.'})
  const original=(await query('SELECT a.*, s.duration_minutes FROM appointments a JOIN services s ON s.id=a.service_id WHERE a.id=$1',[id])).rows[0]
  if(!original) throw createError({statusCode:404,message:'نوبت پیدا نشد.'})
  const s=await getSettings()
  let slot
  if(data.date && data.time) {
    const allowed=await availableSlots(data.date,Number(original.service_id),id)
    if(!allowed.includes(data.time)) throw createError({statusCode:409,message:'ساعت انتخاب‌شده در برنامه مطب آزاد نیست.'})
    slot=resolveSlot(data.date,data.time,original.duration_minutes,s.timezone)
  }
  try {
    const r=await transaction(async client => {
      const locked=(await client.query('SELECT id FROM appointments WHERE id=$1 FOR UPDATE',[id])).rows[0]
      if(!locked) throw createError({statusCode:404,message:'نوبت پیدا نشد.'})
      return client.query(`UPDATE appointments SET status=COALESCE($1,status),start_at=COALESCE($2,start_at),end_at=COALESCE($3,end_at),reminder_sent_at=CASE WHEN $2::timestamptz IS NOT NULL THEN NULL ELSE reminder_sent_at END,updated_at=NOW() WHERE id=$4 RETURNING id,status`,[data.status||null,slot?.start||null,slot?.end||null,id])
    })
    return r.rows[0]
  } catch(err:any) { if(err.code==='23P01') throw createError({statusCode:409,message:'این ساعت هم‌زمان توسط نوبت دیگری اشغال شده است.'}); throw err }
})

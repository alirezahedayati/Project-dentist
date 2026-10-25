import { z } from 'zod'
import { requireAdmin } from '../../utils/auth'
import { parseBody } from '../../utils/validators'
import { query } from '../../utils/db'
const time=z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/)
const url=z.string().trim().max(700).refine(v => {if(!v)return true;try{return ['http:','https:'].includes(new URL(v).protocol)}catch{return false}}, 'لینک باید با http یا https شروع شود.')
const hours=z.record(z.array(z.tuple([time,time]))).superRefine((obj,ctx)=>{
  for(let i=0;i<7;i++) {
    const intervals=obj[String(i)]
    if (!intervals) {ctx.addIssue({code:'custom',message:'برنامه تمام روزهای هفته را وارد کنید.'});continue}
    let end=-1
    for(const [a,b] of intervals) {
      const getM=(v:string)=>Number(v.slice(0,2))*60+Number(v.slice(3))
      if (getM(a)>=getM(b)||getM(a)<end) ctx.addIssue({code:'custom',message:'بازه‌های ساعت کاری باید مرتب و بدون تداخل باشند.'})
      end=getM(b)
    }
  }
})
const settingsSchema=z.object({
  doctor_name:z.string().trim().min(3).max(150),tagline:z.string().trim().min(3).max(200),
  intro:z.string().trim().max(1500),biography:z.string().trim().max(5000),
  education:z.string().trim().max(2500),certificates:z.string().trim().max(2500),
  doctor_photo:url,hero_photo:url.or(z.string().startsWith('/images/')),
  phone:z.string().trim().max(30),address:z.string().trim().max(1000),map_url:url,
  instagram_url:url,timezone:z.string().min(3).max(80),
  cancellation_hours:z.coerce.number().int().min(0).max(168),
  booking_horizon_days:z.coerce.number().int().min(7).max(365),
  slot_step_minutes:z.coerce.number().int().refine(v=>[5,10,15,20,30,60].includes(v)),
  working_hours:hours,deposit_enabled:z.boolean()
})
export default defineEventHandler(async(event)=>{
  await requireAdmin(event)
  const b=parseBody(settingsSchema,await readBody(event))
  try {new Intl.DateTimeFormat('en-US',{timeZone:b.timezone})}
  catch {throw createError({statusCode:422,message:'منطقه زمانی معتبر نیست.'})}
  const keys=Object.keys(b)
  const expressions=keys.map((key,i)=>`"${key}"=$${i+1}`).join(',')
  const r=await query(`UPDATE clinic_settings SET ${expressions},updated_at=now() WHERE id=1 RETURNING *`,
    keys.map(k=>k==='working_hours'?JSON.stringify(b.working_hours):(b as any)[k]))
  return r.rows[0]
})

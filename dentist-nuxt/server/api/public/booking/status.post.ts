import { parseBody, trackingSchema } from '../../../utils/validators'
import { query } from '../../../utils/db'
import { getSettings } from '../../../utils/clinic'
import { localDate, localTime } from '../../../utils/schedule'
export default defineEventHandler(async(event) => {
  const b = parseBody(trackingSchema,await readBody(event))
  const result = await query(`SELECT a.tracking_code,a.patient_name,a.status,a.start_at,a.end_at,s.name AS service
    FROM appointments a JOIN services s ON s.id=a.service_id WHERE a.tracking_code=$1 AND a.mobile=$2`, [b.code,b.mobile])
  if (!result.rows[0]) throw createError({ statusCode:404, message:'نوبتی با این مشخصات یافت نشد.' })
  const a = result.rows[0], settings = await getSettings()
  const canModify = a.status==='confirmed' && new Date(a.start_at).getTime()-Date.now() > settings.cancellation_hours*3600000
  return { code:a.tracking_code, patientName:a.patient_name, status:a.status, date:localDate(a.start_at,settings.timezone), time:localTime(a.start_at,settings.timezone), service:a.service, canModify, cancellationHours:settings.cancellation_hours }
})

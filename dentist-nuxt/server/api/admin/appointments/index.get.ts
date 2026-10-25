import { requireAdmin } from '../../../utils/auth'
import { query } from '../../../utils/db'
import { getSettings } from '../../../utils/clinic'
import { localDate,localTime } from '../../../utils/schedule'
export default defineEventHandler(async event => {
  await requireAdmin(event)
  const q=getQuery(event)
  const s=await getSettings()
  const status=String(q.status||'all'); const term=String(q.q||'').slice(0,100)
  const day=String(q.date||'')
  const validStatus=['all','confirmed','cancelled','completed','no_show'].includes(status)?status:'all'
  const r=await query(`SELECT a.id,a.patient_name,a.mobile,a.notes,a.tracking_code,a.status,a.start_at,a.end_at,a.service_id,s.name AS service
    FROM appointments a JOIN services s ON s.id=a.service_id
    WHERE ($1='all' OR a.status=$1)
      AND ($2='' OR a.patient_name ILIKE '%'||$2||'%' OR a.mobile LIKE '%'||$2||'%' OR a.tracking_code ILIKE '%'||$2||'%')
      AND ($3='' OR (a.start_at AT TIME ZONE $4)::date=$3::date)
    ORDER BY a.start_at DESC LIMIT 500`,[validStatus,term,/^\d{4}-\d{2}-\d{2}$/.test(day)?day:'',s.timezone])
  return r.rows.map(a=>({...a,date:localDate(a.start_at,s.timezone),time:localTime(a.start_at,s.timezone)}))
})

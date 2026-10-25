import { requireAdmin } from '../../utils/auth'
import { query } from '../../utils/db'
import { getSettings } from '../../utils/clinic'
import { localDate } from '../../utils/schedule'
export default defineEventHandler(async event => {
  await requireAdmin(event)
  const s=await getSettings()
  const today=localDate(new Date(),s.timezone)
  const r=await query(`SELECT
    count(*)::int AS total,
    count(*) FILTER (WHERE status='confirmed')::int AS confirmed,
    count(*) FILTER (WHERE status='cancelled')::int AS cancelled,
    count(*) FILTER (WHERE status='completed')::int AS completed,
    count(*) FILTER (WHERE (start_at AT TIME ZONE $1)::date=$2::date AND status='confirmed')::int AS today,
    count(*) FILTER (WHERE start_at > now() AND status='confirmed')::int AS upcoming
    FROM appointments`,[s.timezone,today])
  return { ...r.rows[0], date:today }
})

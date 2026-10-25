import { query } from '../../utils/db'
import { getSettings } from '../../utils/clinic'
import { localDate } from '../../utils/schedule'
export default defineEventHandler(async () => {
  const settings=await getSettings()
  const today=localDate(new Date(),settings.timezone)
  const r=await query('SELECT date::text AS date FROM holidays WHERE date >= $1::date ORDER BY date LIMIT 400',[today])
  return r.rows.map(row=>row.date)
})

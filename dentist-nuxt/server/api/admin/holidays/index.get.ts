import { requireAdmin } from '../../../utils/auth'
import { query } from '../../../utils/db'
export default defineEventHandler(async(event)=>{
  await requireAdmin(event)
  const r=await query('SELECT id,date::text AS date,reason FROM holidays ORDER BY date DESC LIMIT 500')
  return r.rows
})

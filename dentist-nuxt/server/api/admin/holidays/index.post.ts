import { z } from 'zod'
import { requireAdmin } from '../../../utils/auth'
import { parseBody } from '../../../utils/validators'
import { query } from '../../../utils/db'
export default defineEventHandler(async(event)=>{
  await requireAdmin(event)
  const b=parseBody(z.object({date:z.string().regex(/^\d{4}-\d{2}-\d{2}$/),reason:z.string().trim().max(200).default('تعطیلی مطب')}),await readBody(event))
  const r=await query(`INSERT INTO holidays(date,reason) VALUES($1,$2) ON CONFLICT(date) DO UPDATE SET reason=EXCLUDED.reason RETURNING id,date::text AS date,reason`,[b.date,b.reason])
  return r.rows[0]
})

import { requireAdmin } from '../../../utils/auth'
import { parseBody,serviceSchema } from '../../../utils/validators'
import { query } from '../../../utils/db'
export default defineEventHandler(async(event)=>{
  await requireAdmin(event)
  const b=parseBody(serviceSchema,await readBody(event))
  const r=await query(`INSERT INTO services(name,description,icon,duration_minutes,sort_order,is_active)
    VALUES($1,$2,$3,$4,$5,$6) RETURNING *`,[b.name,b.description,b.icon,b.duration_minutes,b.sort_order,b.is_active])
  setResponseStatus(event,201); return r.rows[0]
})

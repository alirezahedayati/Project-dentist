import { requireAdmin } from '../../../utils/auth'
import { parseBody,serviceSchema } from '../../../utils/validators'
import { query } from '../../../utils/db'
export default defineEventHandler(async(event)=>{
  await requireAdmin(event)
  const id=Number(getRouterParam(event,'id'))
  const b=parseBody(serviceSchema,await readBody(event))
  if(!Number.isInteger(id)||id<=0) throw createError({statusCode:422,message:'شناسه نامعتبر است.'})
  const r=await query(`UPDATE services SET name=$1,description=$2,icon=$3,duration_minutes=$4,sort_order=$5,is_active=$6 WHERE id=$7 RETURNING *`,[b.name,b.description,b.icon,b.duration_minutes,b.sort_order,b.is_active,id])
  if(!r.rowCount) throw createError({statusCode:404,message:'خدمت یافت نشد.'})
  return r.rows[0]
})

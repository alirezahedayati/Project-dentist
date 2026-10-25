import { requireAdmin } from '../../../utils/auth'
import { query } from '../../../utils/db'
// Soft-delete to preserve historical appointments and their linked service.
export default defineEventHandler(async(event)=>{
  await requireAdmin(event)
  const id=Number(getRouterParam(event,'id'))
  if(!Number.isInteger(id)||id<=0) throw createError({statusCode:422,message:'شناسه نامعتبر است.'})
  const r=await query('UPDATE services SET is_active=false WHERE id=$1 RETURNING id',[id])
  if(!r.rowCount) throw createError({statusCode:404,message:'خدمت یافت نشد.'})
  return {success:true}
})

import { requireAdmin } from '../../../utils/auth'
import { query } from '../../../utils/db'
export default defineEventHandler(async(event)=>{
  await requireAdmin(event)
  const id=Number(getRouterParam(event,'id'))
  if(!Number.isInteger(id)||id<=0) throw createError({statusCode:422,message:'شناسه نامعتبر است.'})
  await query('DELETE FROM holidays WHERE id=$1',[id])
  return {success:true}
})

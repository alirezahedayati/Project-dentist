import { z } from 'zod'
import { authenticate,createSession } from '../../utils/auth'
import { parseBody } from '../../utils/validators'
import { query } from '../../utils/db'
export default defineEventHandler(async event => {
  const {email,password}=parseBody(z.object({email:z.string().email().max(254),password:z.string().min(1).max(200)}),await readBody(event))
  const ip=getRequestIP(event,{xForwardedFor:false}) || 'unknown'
  const attempts=await query("SELECT count(*)::int AS n FROM login_attempts WHERE ip=$1 AND created_at > now()-interval '15 minutes'",[ip])
  if (attempts.rows[0].n >= 8) throw createError({statusCode:429,message:'تلاش‌های ناموفق زیاد است؛ ۱۵ دقیقه بعد دوباره تلاش کنید.'})
  const admin=await authenticate(email,password)
  if (!admin) {await query('INSERT INTO login_attempts(ip) VALUES($1)',[ip]); throw createError({statusCode:401,message:'ایمیل یا رمز عبور نادرست است.'})}
  await query('DELETE FROM login_attempts WHERE ip=$1',[ip])
  await createSession(event,admin.id)
  return {success:true,email:admin.email}
})

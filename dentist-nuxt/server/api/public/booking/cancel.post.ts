import { trackingSchema, parseBody } from '../../../utils/validators'
import { query } from '../../../utils/db'
import { getSettings } from '../../../utils/clinic'
export default defineEventHandler(async(event) => {
  const b = parseBody(trackingSchema,await readBody(event))
  const s = await getSettings()
  const result = await query(`UPDATE appointments SET status='cancelled',updated_at=NOW()
    WHERE tracking_code=$1 AND mobile=$2 AND status='confirmed'
      AND start_at > NOW()+($3::integer * interval '1 hour') RETURNING id`,[b.code,b.mobile,s.cancellation_hours])
  if (!result.rowCount) throw createError({statusCode:409,message:'لغو این نوبت مجاز نیست؛ کد، شماره موبایل یا مهلت لغو را بررسی کنید.'})
  return {success:true}
})

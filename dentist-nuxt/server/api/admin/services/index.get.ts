import { requireAdmin } from '../../../utils/auth'
import { getServices } from '../../../utils/clinic'
export default defineEventHandler(async(event)=>{await requireAdmin(event);return getServices(false)})

import { requireAdmin } from '../../utils/auth'
import { getSettings } from '../../utils/clinic'
export default defineEventHandler(async(event)=>{await requireAdmin(event);return getSettings()})

import { getServices } from '../../utils/clinic'
export default defineEventHandler(async () => await getServices())

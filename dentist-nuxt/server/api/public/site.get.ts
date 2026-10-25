import { getSettings } from '../../utils/clinic'
export default defineEventHandler(async () => {
  const { id, updated_at, ...site } = await getSettings()
  return { site, smsConfigured: !!(process.env.SMS_API_URL && process.env.SMS_API_KEY) }
})

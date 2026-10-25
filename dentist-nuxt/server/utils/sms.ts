/** This adapter sends SMS only if explicitly configured. Never treats unconfigured SMS as sent. */
export async function sendSms(to: string, message: string): Promise<boolean> {
  const endpoint = process.env.SMS_API_URL
  const key = process.env.SMS_API_KEY
  if (!endpoint || !key) return false
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
      body: JSON.stringify({ to, message, sender: process.env.SMS_SENDER || '' }),
      signal: AbortSignal.timeout(9000)
    })
    if (!response.ok) console.error('SMS provider returned error status:', response.status)
    return response.ok
  } catch (error) { console.error('SMS provider unavailable:', error instanceof Error ? error.message : 'unknown'); return false }
}

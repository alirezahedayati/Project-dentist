export default defineEventHandler((event) => {
  const method = getMethod(event)
  if (!['POST','PUT','PATCH','DELETE'].includes(method)) return
  // Site-origin requests must match the request host. Missing Origin is allowed for CLI/API clients,
  // which cannot issue a browser-authenticated cross-origin form request with a custom content-type.
  const origin = getHeader(event,'origin')
  if (!origin) return
  const host = getHeader(event,'x-forwarded-host') || getHeader(event,'host')
  let hostname = ''
  try { hostname = new URL(origin).host } catch { throw createError({ statusCode:403, message:'مبدأ درخواست نامعتبر است.' }) }
  if (hostname !== host) throw createError({ statusCode: 403, message: 'درخواست از مبدأ غیرمجاز است.' })
})

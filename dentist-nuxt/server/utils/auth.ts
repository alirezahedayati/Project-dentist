import { createHash, randomBytes } from 'node:crypto'
import bcrypt from 'bcryptjs'
import type { H3Event } from 'h3'
import { query } from './db'
const cookieName = 'dentist_admin_session'
function tokenHash(token: string) { return createHash('sha256').update(token).digest('hex') }
export async function authenticate(email: string, password: string) {
  const { rows } = await query('SELECT id,email,password_hash FROM admin_users WHERE email = $1', [email.trim().toLowerCase()])
  if (!rows[0] || !await bcrypt.compare(password, rows[0].password_hash)) return null
  return rows[0] as { id: string; email: string }
}
export async function createSession(event: H3Event, id: string) {
  const token = randomBytes(32).toString('base64url')
  const expires = new Date(Date.now() + 7 * 86400000)
  await query('INSERT INTO admin_sessions(token_hash,admin_id,expires_at) VALUES($1,$2,$3)', [tokenHash(token), id, expires])
  setCookie(event, cookieName, token, { httpOnly: true, secure: useRuntimeConfig().sessionCookieSecure, sameSite: 'lax', path: '/', expires })
}
export async function requireAdmin(event: H3Event) {
  const token = getCookie(event, cookieName)
  if (!token || token.length > 200) throw createError({ statusCode: 401, message: 'برای ادامه وارد پنل مدیریت شوید.' })
  const { rows } = await query(`SELECT u.id, u.email FROM admin_sessions s
    JOIN admin_users u ON u.id=s.admin_id WHERE s.token_hash=$1 AND s.expires_at > NOW()`, [tokenHash(token)])
  if (!rows[0]) throw createError({ statusCode: 401, message: 'نشست مدیریت منقضی شده است.' })
  return rows[0] as { id: string; email: string }
}
export async function destroySession(event: H3Event) {
  const token = getCookie(event, cookieName)
  if (token) await query('DELETE FROM admin_sessions WHERE token_hash=$1', [tokenHash(token)])
  deleteCookie(event, cookieName, { path: '/' })
}

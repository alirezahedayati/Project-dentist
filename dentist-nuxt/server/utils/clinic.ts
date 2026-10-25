import { query } from './db'
export async function getSettings() {
  const { rows } = await query('SELECT * FROM clinic_settings WHERE id=1')
  if (!rows.length) throw createError({ statusCode: 503, message: 'تنظیمات مطب یافت نشد؛ ابتدا راه‌اندازی پایگاه داده را انجام دهید.' })
  return rows[0]
}
export async function getServices(activeOnly = true) {
  const { rows } = await query(`SELECT * FROM services ${activeOnly ? 'WHERE is_active = true' : ''} ORDER BY sort_order ASC, id ASC`)
  return rows
}

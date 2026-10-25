import { fromZonedTime, formatInTimeZone } from 'date-fns-tz'
import { query } from './db'
import { getSettings } from './clinic'

export const minutes = (hhmm: string) => { const [h,m] = hhmm.split(':').map(Number); return h*60+m }
const pad = (n: number) => `${n}`.padStart(2,'0')
export const clock = (minute: number) => `${pad(Math.floor(minute/60))}:${pad(minute%60)}`
export const localDate = (date: Date, tz: string) => formatInTimeZone(date, tz, 'yyyy-MM-dd')
export const localTime = (date: Date, tz: string) => formatInTimeZone(date, tz, 'HH:mm')
export function resolveSlot(date: string, time: string, duration: number, tz: string) {
  const start = fromZonedTime(`${date}T${time}:00`, tz)
  const end = new Date(start.getTime() + duration*60000)
  if (localDate(start,tz) !== date || localTime(start,tz) !== time || localDate(end,tz) !== date) return null
  return { start, end }
}
export async function availableSlots(date: string, serviceId: number, excludeId?: number) {
  const settings = await getSettings()
  const validDate = /^\d{4}-\d{2}-\d{2}$/.test(date) && !Number.isNaN(Date.parse(`${date}T12:00:00Z`)) && new Date(`${date}T12:00:00Z`).toISOString().slice(0,10) === date
  if (!validDate) throw createError({ statusCode: 422, message: 'تاریخ معتبر نیست.' })
  const daysAhead = Math.floor((Date.parse(date+'T12:00:00Z')-Date.parse(localDate(new Date(),settings.timezone)+'T12:00:00Z'))/86400000)
  if (daysAhead < 0 || daysAhead > settings.booking_horizon_days) return []
  const serviceRes = await query('SELECT duration_minutes FROM services WHERE id=$1 AND is_active=true', [serviceId])
  const service = serviceRes.rows[0]
  if (!service) throw createError({ statusCode: 404, message: 'خدمت انتخاب‌شده فعال نیست.' })
  const holiday = await query('SELECT 1 FROM holidays WHERE date=$1::date', [date])
  if (holiday.rowCount) return []
  const weekday = new Date(`${date}T12:00:00Z`).getUTCDay()
  const intervals: string[][] = settings.working_hours[String(weekday)] || []
  const dayStart = fromZonedTime(`${date}T00:00:00`,settings.timezone)
  const dayEnd = fromZonedTime(`${date}T23:59:59`,settings.timezone)
  const busy = await query('SELECT start_at,end_at FROM appointments WHERE status IN (\'confirmed\',\'completed\',\'no_show\') AND start_at <= $2 AND end_at >= $1 AND ($3::bigint IS NULL OR id != $3)', [dayStart,dayEnd,excludeId || null])
  const output: string[] = []
  for (const interval of intervals) {
    if (!Array.isArray(interval) || interval.length !== 2) continue
    const first = minutes(interval[0]); const last = minutes(interval[1]); const step = settings.slot_step_minutes
    for(let m=first; m+service.duration_minutes <= last; m+=step) {
      const slot = resolveSlot(date, clock(m), service.duration_minutes, settings.timezone)
      if (!slot || slot.start.getTime() < Date.now() + 30*60000) continue
      if (busy.rows.some(b => new Date(b.start_at).getTime() < slot.end.getTime() && new Date(b.end_at).getTime() > slot.start.getTime())) continue
      output.push(clock(m))
    }
  }
  return [...new Set(output)]
}

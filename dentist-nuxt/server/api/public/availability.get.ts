import { availableSlots } from '../../utils/schedule'
export default defineEventHandler(async (event) => {
  const args = getQuery(event)
  const id = Number(args.serviceId)
  if (!Number.isInteger(id) || id <= 0) throw createError({ statusCode:422, message:'نوع خدمت نامعتبر است.' })
  const date = String(args.date || '')
  return { date, slots: await availableSlots(date,id) }
})

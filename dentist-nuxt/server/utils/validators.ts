import { z } from 'zod'
export const normalizeDigits = (value: string) => value.replace(/[۰-۹]/g, c => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(c))).replace(/[٠-٩]/g, c => String('٠١٢٣٤٥٦٧٨٩'.indexOf(c)))
export const normalizeMobile = (mobile: string) => {
  const n = normalizeDigits(mobile).replace(/[\s-]/g, '')
  return n.startsWith('+98') ? `0${n.slice(3)}` : n.startsWith('0098') ? `0${n.slice(4)}` : n
}
export const mobileSchema = z.string().transform(normalizeMobile).refine(v => /^09\d{9}$/.test(v), 'شماره موبایل معتبر نیست.')
export const bookingSchema = z.object({
  serviceId: z.coerce.number().int().positive(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
  patientName: z.string().trim().min(3, 'نام و نام خانوادگی را وارد کنید.').max(120),
  mobile: mobileSchema,
  notes: z.string().trim().max(1000).default('')
})
export const trackingSchema = z.object({
  code: z.string().trim().toUpperCase().regex(/^[A-Z0-9]{8,20}$/),
  mobile: mobileSchema
})
export const serviceSchema = z.object({
  name: z.string().trim().min(2).max(120), description: z.string().trim().max(600).default(''),
  icon: z.string().regex(/^[a-z-]{2,40}$/).default('sparkles'),
  duration_minutes: z.coerce.number().int().min(15).max(240),
  sort_order: z.coerce.number().int().min(0).max(1000).default(0),
  is_active: z.boolean().default(true)
})
export function parseBody<T>(schema: z.ZodSchema<T>, value: unknown): T {
  const result = schema.safeParse(value)
  if (!result.success) throw createError({ statusCode: 422, message: result.error.issues[0]?.message || 'اطلاعات ورودی معتبر نیست.' })
  return result.data
}

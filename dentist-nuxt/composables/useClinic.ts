export const useClinic = () => useNuxtData<{site: Record<string, any>; smsConfigured:boolean}>('public-site')
export const faNumber = (value: number|string) => new Intl.NumberFormat('fa-IR').format(Number(value))
export const faDate = (iso: string, tz = 'Asia/Tehran') => new Intl.DateTimeFormat('fa-IR-u-ca-persian',{timeZone:tz,year:'numeric',month:'long',day:'numeric',weekday:'long'}).format(new Date(`${iso}T12:00:00Z`))
export function humanError(err: any) {
  return err?.data?.message || err?.message || err?.data?.statusMessage || 'مشکلی در انجام عملیات رخ داد. دوباره تلاش کنید.'
}

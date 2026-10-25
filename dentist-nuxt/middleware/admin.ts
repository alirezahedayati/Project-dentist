export default defineNuxtRouteMiddleware(async () => {
  try {
    if (import.meta.server) await useRequestFetch()('/api/admin/session')
    else await $fetch('/api/admin/session')
  } catch { return navigateTo('/admin/login') }
})

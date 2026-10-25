export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  modules: ['@nuxtjs/tailwindcss'],
  tailwindcss: { cssPath: '~/assets/css/main.css', viewer: false },
  devtools: { enabled: false },
  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL,
    sessionCookieSecure: process.env.SESSION_COOKIE_SECURE === 'true',
    public: { siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000' }
  },
  app: { head: {
    htmlAttrs: { lang: 'fa', dir: 'rtl' },
    title: 'دکتر آزاده مهرداد | دندانپزشکی و رزرو نوبت آنلاین',
    meta: [
      { name: 'description', content: 'معرفی خدمات دندانپزشکی دکتر آزاده مهرداد و رزرو آنلاین نوبت با تقویم شمسی.' },
      { name: 'theme-color', content: '#0c5149' }
    ],
    link: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800&display=swap' }
    ]
  } }
})

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '../../stores'
import { api } from '../../plugins/axios'

const authStore = useAuthStore()

const menus = ref([])
const scrolled = ref(false)
const mobileOpen = ref(false)

const fetchMenus = async () => {
    try {
        const response = await api.get('/menus')
        menus.value = response.data.menus || []
    } catch (error) {
        console.error('Error fetching menus:', error)
    }
}

const handleScroll = () => {
    scrolled.value = window.scrollY > 24
}

const closeMobile = () => { mobileOpen.value = false }

onMounted(() => {
    fetchMenus()
    window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header class="site-header" :class="{ 'is-scrolled': scrolled }">
    <nav class="ds-container site-header__inner" aria-label="ناوبری اصلی">
      <RouterLink class="site-header__brand" to="/" @click="closeMobile">
        <span class="site-header__logo">
          <i class="fa-solid fa-tooth"></i>
        </span>
        <span class="site-header__brand-text">
          دکتر آزاده مهرداد
          <small>دندانپزشکی و زیبایی لبخند</small>
        </span>
      </RouterLink>

      <div class="site-header__nav" :class="{ 'is-open': mobileOpen }" id="site-nav">
        <ul class="site-header__menu">
          <li v-for="menu in menus" :key="menu.id" class="site-header__item dropdown">
            <RouterLink
              v-if="!menu.submenus || menu.submenus.length === 0"
              class="site-header__link"
              :to="menu.url"
              @click="closeMobile"
            >{{ menu.title }}</RouterLink>

            <button
              v-else
              type="button"
              class="site-header__link dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >{{ menu.title }}</button>

            <ul v-if="menu.submenus && menu.submenus.length" class="dropdown-menu">
              <li v-for="submenu in menu.submenus" :key="submenu.id">
                <RouterLink class="dropdown-item" :to="submenu.url" @click="closeMobile">{{ submenu.title }}</RouterLink>
              </li>
            </ul>
          </li>
        </ul>

        <div class="site-header__actions">
          <RouterLink to="/reservation" class="ds-btn ds-btn--primary ds-btn--sm" @click="closeMobile">
            <i class="fa-regular fa-calendar-check"></i>
            نوبت گیری آنلاین
          </RouterLink>
          <RouterLink :to="authStore.isLoggedIn ? '/logout' : '/login'" class="site-header__auth" @click="closeMobile">
            <i :class="authStore.isLoggedIn ? 'fa-solid fa-right-from-bracket' : 'fa-regular fa-circle-user'"></i>
            {{ authStore.isLoggedIn ? 'خروج از حساب' : 'ورود / ثبت‌نام' }}
          </RouterLink>
        </div>
      </div>

      <button
        type="button"
        class="site-header__burger d-lg-none"
        :aria-expanded="mobileOpen"
        aria-controls="site-nav"
        aria-label="باز و بسته کردن منو"
        @click="mobileOpen = !mobileOpen"
      >
        <i :class="mobileOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'"></i>
      </button>
    </nav>

    <Transition name="fade">
      <div v-if="mobileOpen" class="site-header__backdrop d-lg-none" @click="closeMobile"></div>
    </Transition>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 1035;
  background: rgba(255, 255, 255, .92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid transparent;
  transition: box-shadow var(--ds-dur) var(--ds-ease), border-color var(--ds-dur) var(--ds-ease);
}
.site-header.is-scrolled {
  border-bottom-color: var(--ds-border);
  box-shadow: var(--ds-shadow-sm);
}

.site-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  min-height: var(--ds-header-h);
}

.site-header__brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-weight: 900;
  font-size: var(--ds-fs-md);
  color: var(--ds-heading);
}
.site-header__brand:hover { color: var(--ds-primary-700); }
.site-header__logo {
  width: 46px;
  height: 46px;
  display: grid;
  place-items: center;
  border-radius: 15px;
  font-size: 21px;
  color: #fff;
  background: linear-gradient(135deg, var(--ds-primary-400), var(--ds-primary-700));
  box-shadow: 0 8px 18px -6px rgba(31, 160, 156, .55);
}
.site-header__brand-text { display: flex; flex-direction: column; line-height: 1.35; }
.site-header__brand-text small {
  font-size: var(--ds-fs-xs);
  font-weight: 600;
  color: var(--ds-text-muted);
}

.site-header__nav { display: flex; align-items: center; gap: 22px; }
.site-header__menu { display: flex; align-items: center; gap: 4px; }
.site-header__item { position: relative; }

.site-header__link {
  display: inline-block;
  padding: 9px 14px;
  border-radius: var(--ds-radius-full);
  font-weight: 700;
  font-size: var(--ds-fs-base);
  color: var(--ds-gray-600);
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--ds-font);
  transition: all .2s var(--ds-ease);
}
.site-header__link:hover,
.site-header__link.router-link-exact-active {
  color: var(--ds-primary-700);
  background: var(--ds-primary-50);
}
.site-header__link.dropdown-toggle::after { margin-inline-start: 6px; }

.site-header__actions { display: flex; align-items: center; gap: 12px; }

.site-header__auth {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: var(--ds-fs-sm);
  font-weight: 700;
  color: var(--ds-gray-600);
  padding: 9px 14px;
  border-radius: var(--ds-radius-full);
  border: 1.5px solid var(--ds-gray-200);
  transition: all .2s var(--ds-ease);
}
.site-header__auth:hover { border-color: var(--ds-primary-400); color: var(--ds-primary-700); background: #fff; }

.site-header__burger {
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  border: 1px solid var(--ds-border);
  background: #fff;
  color: var(--ds-primary-700);
  font-size: 18px;
  cursor: pointer;
}

.site-header__backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, .45);
  z-index: -1;
}

.fade-enter-active, .fade-leave-active { transition: opacity .25s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

@media (max-width: 991.98px) {
  .site-header__nav {
    position: fixed;
    inset-block: 0;
    inset-inline-end: 0;
    width: min(340px, 88vw);
    flex-direction: column;
    align-items: stretch;
    gap: 18px;
    background: #fff;
    padding: 90px 20px 28px;
    box-shadow: var(--ds-shadow-lg);
    transform: translateX(100%);
    transition: transform .3s var(--ds-ease);
    overflow-y: auto;
    z-index: 1040;
  }
  [dir="ltr"] .site-header__nav { transform: translateX(-100%); }
  .site-header__nav.is-open { transform: translateX(0) !important; }
  .site-header__menu { flex-direction: column; align-items: stretch; gap: 2px; }
  .site-header__link { width: 100%; text-align: start; }
  .site-header__actions { flex-direction: column; align-items: stretch; }
  .site-header__auth { justify-content: center; }
  .dropdown-menu { position: static !important; transform: none !important; border: none; box-shadow: none; padding: 0 12px; }
}
</style>

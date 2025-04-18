import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/HomeView.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/LoginView.vue'),
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/RegisterView.vue'),
    },
    {
        path: '/forgot-password',
        name: 'forgot-password',
        component: () => import('../views/ForgotPasswordView.vue'),
    },
    {
        path: '/reservation',
        name: 'reservation',
        component: () => import('../views/ReservationView.vue'),
    },
    {
        path: '/sended-code',
        name: 'sended-code',
        component: () => import('../views/SendedCode.vue'),
    },
    {
        path: '/admin',
        name: 'admin',
        component: () => import('../views/AdminDashboardView.vue'),
    },
    {
        path: '/admin/appointments',
        name: 'admin-appointments',
        component: () => import('../views/AdminAppointmentsView.vue'),
    },
    {
        path: '/admin/users',
        name: 'admin-users',
        component: () => import('../views/AdminUsersView.vue'),
    },
    {
        path: '/admin/add-menu',
        name: 'admin-add-menu',
        component: () => import('../views/AdminAddMenuView.vue'),
    },
    {
        path: '/admin/add-galery',
        name: 'admin-add-galery',
        component: () => import('../views/AdminAddGaleryView.vue'),
    },
    {
        path: '/logout',
        name: 'logout',
        component: () => import('../views/LogoutView.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import('../views/NotFoundView.vue'),
    },
    {
        path: '/logout',
        name: 'logout',
        component: () => import('../views/LogoutView.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_BASE_URL),
    routes,
})

router.beforeEach((to) => {
    const authStore = useAuthStore()
    if (to.meta.requiresAuth && !authStore.isLoggedIn) return '/login'
})

export default router

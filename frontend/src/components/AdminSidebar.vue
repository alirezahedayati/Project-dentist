<script setup>
import { RouterLink } from 'vue-router'

defineProps({
    page: {
        type: String,
        required: true,
    }
})
</script>

<template>
    <ul class="navbar-nav sidebar sidebar-dark accordion" id="accordionSidebar" style="background-color: #3fbbc0;">

        <RouterLink class="sidebar-brand d-flex align-items-center justify-content-center" to="/">
            <div class="sidebar-brand-icon rotate-n-15">
                <i class="fas fa-laugh-wink"></i>
            </div>
            <div class="sidebar-brand-text mx-3">علیرضا هدایتی</div>
        </RouterLink>
        <hr class="sidebar-divider my-0">

        <li :class="`nav-item ${page === 'dashboard' ? 'active' : ''}`">
            <RouterLink class="nav-link" to="/admin">
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span>داشبورد</span>
            </RouterLink>
        </li>
        <hr class="sidebar-divider my-0">

        <li :class="`nav-item ${page === 'users' ? 'active' : ''}`">
            <RouterLink class="nav-link" to="/admin/users">
                <i class="fas fa-fw fa-table"></i>
                <span>کاربران</span>
            </RouterLink>
        </li>

        <li :class="`nav-item ${page === 'appointments' ? 'active' : ''}`">
            <RouterLink class="nav-link" to="/admin/appointments">
                <i class="fas fa-fw fa-table"></i>
                <span>نوبت ها</span>
            </RouterLink>
        </li>
        <li :class="`nav-item ${page === 'menu' ? 'active' : ''}`">
            <RouterLink class="nav-link" to="/admin/add-menu">
                <i class="fas fa-fw fa-table"></i>
                <span>افزودن منو</span>
            </RouterLink>
        </li>
        <li :class="`nav-item ${page === 'galery' ? 'active' : ''}`">
            <RouterLink class="nav-link" to="/admin/add-galery">
                <i class="fas fa-fw fa-table"></i>
                <span>افزودن عکس به گالری</span>
            </RouterLink>
        </li>
        <hr class="sidebar-divider my-0">

    </ul>
</template>

<style scoped>
@import '../assets/css/sb-admin-2.min.css';
</style>
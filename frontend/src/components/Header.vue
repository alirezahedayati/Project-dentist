<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '../stores'
import axios from 'axios'

const authStore = useAuthStore()
const menus = ref([])

const fetchMenus = async () => {
    try {
        const response = await axios.get('http://localhost:8000/menus')
        console.log('Menus:', response.data)
        menus.value = response.data.menus || []
    } catch (error) {
        console.error('Error fetching menus:', error)
    }
}

onMounted(() => {
    fetchMenus()
})
</script>

<template>
    <header id="header" class="fixed-top">
        <nav class="navbar navbar-expand-lg">
            <div class="container">
                <RouterLink class="navbar-brand fs-5 fw-bold" to="#">
                    <img src="../assets/img/png-transparent-human-tooth-cartoon-dental-smile-s-white-face-dentistry-thumbnail.png"
                        alt="Logo" width="50" height="50" class="d-inline-block align-text-top mx-2">
                    دکتر آزاده مهرداد
                </RouterLink>
                <button class="navbar-toggler p-2" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav">
                        <li v-for="menu in menus" :key="menu.id" class="nav-item dropdown">
                            <RouterLink 
                                v-if="!menu.submenus || menu.submenus.length === 0"
                                class="nav-link scrollto p-2" 
                                :to="menu.url"
                            >
                                {{ menu.title }}
                            </RouterLink>
                            <a 
                                v-else
                                class="nav-link dropdown-toggle p-2" 
                                href="#" 
                                id="navbarDropdown" 
                                role="button" 
                                data-bs-toggle="dropdown" 
                                aria-expanded="false"
                            >
                                {{ menu.title }}
                            </a>
                            <ul v-if="menu.submenus && menu.submenus.length" class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li v-for="submenu in menu.submenus" :key="submenu.id">
                                    <RouterLink class="dropdown-item" :to="submenu.url">{{ submenu.title }}</RouterLink>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <li class="nav-item">
                        <RouterLink class="nav-link scrollto p-2 btn-reservation" to="/reservation">نوبت گیری</RouterLink>
                    </li>
                    <RouterLink :to="authStore.isLoggedIn ? '/logout' : '/login'" class="appointment-btn scrollto">
                        <span class="d-none d-md-inline"></span>
                        <span v-if="authStore.isLoggedIn">خروج از حساب</span>
                        <span v-else>ورود / ثبت نام</span>
                    </RouterLink>
                </div>
            </div>
        </nav>
    </header>
</template>

<style scoped>
/* Add your component-specific styles here */
.navbar-nav .dropdown-menu {
    display: none; /* Start with the dropdown hidden */
}

.navbar-nav .dropdown:hover .dropdown-menu {
    display: block; /* Show the dropdown when hovering over the parent */
}
</style>

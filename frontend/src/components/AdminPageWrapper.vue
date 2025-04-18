<script setup>
import { onMounted, onUnmounted } from 'vue'
import AdminFooter from '../components/AdminFooter.vue'
import AdminSidebar from '../components/AdminSidebar.vue'
import AdminTopbar from '../components/AdminTopbar.vue'

defineProps({
    page: {
        type: String,
        required: true,
    }
})

onMounted(() => {
    document.body.classList.add('page-top')
})

onUnmounted(() => {
    document.body.classList.remove('page-top')
})
</script>

<template>
    <div id="wrapper">
        <AdminSidebar :page="page" />
        <div id="content-wrapper" class="d-flex flex-column">
            <div id="content">
                <AdminTopbar />
                <slot />
            </div>
            <AdminFooter />
        </div>
    </div>
</template>

<style scoped>
@import '../assets/css/sb-admin-2.min.css';
@import '../assets/css/dataTables.bootstrap5.css';
</style>

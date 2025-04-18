<script setup>
import { ref, onMounted } from 'vue'
import AdminPageWrapper from '../components/AdminPageWrapper.vue'
import axios from 'axios'

const menus = ref([])
const newMenu = ref({
    title: '',
    url: '',
    order_m: 0,
    is_active: 1,
    parent_id: null
})

// دریافت منوهای موجود
const fetchMenus = async () => {
    try {
        const response = await axios.get('http://localhost:8000/menus')
        menus.value = response.data.menus || []
    } catch (error) {
        console.error('Error fetching menus:', error)
    }
}

// افزودن منو جدید
const addMenu = async () => {
    try {
        const response = await axios.post('http://localhost:8000/menus', newMenu.value)
        if (response.data.success) {
            menus.value.push(response.data.menu)
            resetNewMenu()
            window.location.reload() // رفرش صفحه پس از افزودن منو
        }
    } catch (error) {
        console.error('Error adding menu:', error)
    }
}

// بازنشانی فرم منو جدید
const resetNewMenu = () => {
    newMenu.value = {
        title: '',
        url: '',
        order_m: 0,
        is_active: 1,
        parent_id: null
    }
}

// حذف منو
const deleteMenu = async (menuId) => {
    try {
        const response = await axios.post('http://localhost:8000/menus/delete', { id: menuId })
        window.location.reload() // رفرش صفحه پس از حذف منو
        if (response.data.success) {
            menus.value = menus.value.filter(menu => menu.id !== menuId)
            window.location.reload() // رفرش صفحه پس از حذف منو
        }
    } catch (error) {
        console.error('Error deleting menu:', error)
    }
}

// ویرایش منو
const editMenu = (menu) => {
    newMenu.value = { ...menu }
}

onMounted(() => {
    fetchMenus()
})
</script>

<template>
  <AdminPageWrapper page="menu">

    <div class="container mt-5">
        <h2 class="text-center mb-4">مدیریت منوها</h2>

        <!-- فرم افزودن منو جدید -->
        <div class="card mb-4">
            <div class="card-header">
                <h3>افزودن منو</h3>
            </div>
            <div class="card-body">
                <form @submit.prevent="addMenu">
                    <div class="mb-3">
                        <label for="title" class="form-label">عنوان منو</label>
                        <input type="text" id="title" class="form-control" v-model="newMenu.title" required />
                    </div>
                    <div class="mb-3">
                        <label for="url" class="form-label">آدرس منو</label>
                        <input type="text" id="url" class="form-control" v-model="newMenu.url" required />
                    </div>
                    <div class="mb-3">
                        <label for="order_m" class="form-label">ترتیب منو</label>
                        <input type="number" id="order_m" class="form-control" v-model="newMenu.order_m" required />
                    </div>
                    <div class="mb-3">
                        <label for="parent_id" class="form-label">منو والد</label>
                        <select id="parent_id" class="form-select" v-model="newMenu.parent_id">
                            <option value="">بدون والد</option>
                            <option v-for="menu in menus" :key="menu.id" :value="menu.id">{{ menu.title }}</option>
                        </select>
                    </div>
                    <div class="mb-3 form-check">
                        <input type="checkbox" id="is_active" class="form-check-input" v-model="newMenu.is_active" />
                        <label for="is_active" class="form-check-label">فعال</label>
                    </div>
                    <button type="submit" class="btn btn-primary">افزودن منو</button>
                </form>
            </div>
        </div>

        <!-- لیست منوها -->
        <div class="card">
            <div class="card-header">
                <h3>لیست منوها</h3>
            </div>
            <div class="card-body">
                <ul class="list-group">
                    <li v-for="menu in menus" :key="menu.id" class="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <strong>{{ menu.title }}</strong><br />
                            <small class="text-muted">{{ menu.url }}</small>
                        </div>
                        <div>
                            <!-- <button @click="editMenu(menu)" class="btn btn-warning btn-sm me-2">ویرایش</button> -->
                            <button @click="deleteMenu(menu.id)" class="btn btn-danger btn-sm">حذف</button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</AdminPageWrapper>
</template>

<style scoped>
.container {
    max-width: 1200px;
}

.card-header {
    background-color: #f8f9fa;
}

.card-body {
    background-color: #ffffff;
}

button {
    margin-top: 10px;
}
</style>

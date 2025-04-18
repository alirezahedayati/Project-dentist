<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import AdminPageWrapper from '../components/AdminPageWrapper.vue'
import { useUserStore } from '../stores'

const router = useRouter()
const userStore = useUserStore()

// جستجو
const searchQuery = ref('')

// صفحه‌بندی
const currentPage = ref(1)
const itemsPerPage = 10 // تعداد کاربران در هر صفحه

onMounted(async () => {
  const user = await userStore.me()
  if (!user || user.is_admin !== 'true') {
    router.push({ path: '/', replace: true })
    return
  }
  await userStore.fetchUsers() // گرفتن لیست کاربران
})

// فیلتر کردن کاربران بر اساس جستجو
const filteredUsers = computed(() => {
  if (!searchQuery.value.trim()) {
    return userStore.users
  }
  return userStore.users.filter(user => {
    const fullName = `${user.first_name} ${user.last_name}`.toLowerCase()
    return fullName.includes(searchQuery.value.toLowerCase())
  })
})

// مرتب‌سازی کاربران و اعمال صفحه‌بندی
const paginatedUsers = computed(() => {
  const sortedUsers = filteredUsers.value
    .slice()
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  const startIndex = (currentPage.value - 1) * itemsPerPage
  return sortedUsers.slice(startIndex, startIndex + itemsPerPage)
})

// تعداد صفحات
const totalPages = computed(() => {
  return Math.ceil(filteredUsers.value.length / itemsPerPage)
})

// تغییر صفحه
const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}
</script>

<template>
  <AdminPageWrapper page="users">
    <div class="container-fluid">

      <!-- Page Heading -->
      <h1 class="h3 mb-2 text-gray-800">کاربران</h1>

      <div class="card shadow mb-4">
        <div class="card-header py-3">
          <h6 class="m-0 font-weight-bold text-primary">لیست کاربران ثبت نامی</h6>
        </div>
        <div class="card-body">

          <!-- بخش جستجو -->
          <div class="mb-3">
            <input
              v-model="searchQuery"
              type="text"
              class="form-control"
              placeholder="جستجو بر اساس نام و نام خانوادگی"
            />
          </div>

          <!-- جدول کاربران -->
          <div class="table-responsive">
            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
              <thead>
                <tr>
                  <th>نام</th>
                  <th>نام خانوادگی</th>
                  <th>شماره موبایل</th>
                  <th>وضعیت</th>
                  <th>دسترسی ادمین</th>
                  <th>تاریخ عضویت</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in paginatedUsers" :key="user.id">
                  <td>{{ user.first_name }}</td>
                  <td>{{ user.last_name }}</td>
                  <td>{{ user.mobile_number }}</td>
                  <td>{{ user.is_active === 'true' ? 'فعال' : 'غیرفعال' }}</td>
                  <td>{{ user.is_admin === 'true' ? 'دارد' : 'ندارد' }}</td>
                  <td>{{ user.created_at }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <nav aria-label="Page navigation">
            <ul class="pagination justify-content-center">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <button class="page-link" @click="changePage(currentPage - 1)">قبلی</button>
              </li>
              <li
                class="page-item"
                v-for="page in totalPages"
                :key="page"
                :class="{ active: currentPage === page }"
              >
                <button class="page-link" @click="changePage(page)">{{ page }}</button>
              </li>
              <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <button class="page-link" @click="changePage(currentPage + 1)">بعدی</button>
              </li>
            </ul>
          </nav>

        </div>
      </div>
    </div>
  </AdminPageWrapper>
</template>

<style scoped></style>

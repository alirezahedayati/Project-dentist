<script setup>
import { onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'

onMounted(() => {
  document.body.classList.add('page-top')
})

onUnmounted(() => {
  document.body.classList.remove('page-top')
})
</script>

<template>
  <div id="wrapper">
    <div id="content-wrapper" class="d-flex flex-column">
      <div id="content">
        <div class="container-fluid">
          <div class="text-center">
            <div class="error mx-auto" data-text="404">404</div>
            <p class="lead text-gray-800 mb-5 text-center">صفحه ای یافت نشد</p>
            <p class="text-gray-500 mb-5 text-center">صفحه، مطلب، لینک، و یا محصولی که به دنبال آن هستید ممکن است حذف یا
              ویرایش شده باشد</p>
            <RouterLink to="/">بازگشت به صفحه اصلی &larr; </RouterLink>
          </div>
        </div>
      </div>
      <footer class="sticky-footer bg-white">
        <div class="container my-auto">
          <div class="copyright text-center my-auto">
            <span>Copyright &copy; Alireza Hedayati 2024</span>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<style scoped>
@import '../assets/css/sb-admin-2.min.css';
</style>

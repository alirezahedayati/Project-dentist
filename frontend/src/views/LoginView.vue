<script setup>
import { onBeforeMount, onMounted, onUnmounted, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore, useMessageStore } from '../stores'
import ValidationErrors from '../components/ValidationErrors.vue';

const router = useRouter()
const authStore = useAuthStore()
const messageStore = useMessageStore()

onBeforeMount(() => {
  if (authStore.isLoggedIn) {
    router.push({ path: '/', replace: true })
  }
})

onMounted(() => {
  document.body.classList.add('bg-gradient-primary')
  if (router.currentRoute.value.query.nextUrl === '/reservation') {
    messageStore.message = 'برای رزرو نوبت، لطفا ابتدا به حساب خود وارد شوید.'
    messageStore.messageType = 'info'
  }
})

onUnmounted(() => {
  messageStore.$reset()
  document.body.classList.remove('bg-gradient-primary')
})

const mobileNumber = ref('')
const password = ref('')
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-xl-10 col-lg-12 col-md-9">
        <div class="card o-hidden border-0 shadow-lg my-5">
          <div class="card-body p-0">
            <div v-if="messageStore.message" :class="`alert alert-${messageStore.messageType} m-3`" role="alert">
              {{ messageStore.message }}
            </div>
            <div class="row">
              <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
              <div class="col-lg-6">
                <div class="p-5">
                  <div class="text-center">
                    <h1 class="h4 text-gray-900 mb-4 text-center">خوش آمدید</h1>
                  </div>
                  <form class="user" v-on:submit.prevent>
                    <div class="form-group">
                      <input v-model="mobileNumber" type="text" class="form-control form-control-user" maxlength="11"
                        id="exampleInputNumber" placeholder="تلفن همراه">
                      <ValidationErrors field="mobile" :errors="messageStore.errors" />
                    </div>
                    <div class="form-group">
                      <input v-model="password" type="password" class="form-control form-control-user"
                        id="exampleInputPassword" placeholder="رمز عبور">
                      <ValidationErrors field="password" :errors="messageStore.errors" />
                    </div>
                    <div class="form-group">
                      <div class="custom-control custom-checkbox small">
                        <input type="checkbox" class="custom-control-input" id="customCheck">
                        <label class="custom-control-label" for="customCheck">مرا به خاطر بسپار</label>
                      </div>
                    </div>
                    <button class="btn btn-primary btn-user btn-block" @click="authStore.login(mobileNumber, password)">
                      ورود به حساب
                    </button>
                  </form>
                  <hr>
                  <div class="text-center">
                    <RouterLink class="small" to="/forgot-password">رمزت رو فراموش کردی؟</RouterLink>
                  </div>
                  <div class="text-center">
                    <RouterLink class="small" to="/register">ساخت حساب کاربری</RouterLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '../assets/css/sb-admin-2.min.css';
</style>

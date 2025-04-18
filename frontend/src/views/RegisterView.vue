<script setup>
import { onBeforeMount, onMounted, onUnmounted, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore, useMessageStore } from '../stores'
import ValidationErrors from '../components/ValidationErrors.vue'

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
})

onUnmounted(() => {
  messageStore.$reset()
  document.body.classList.remove('bg-gradient-primary')
})

const firstName = ref('')
const lastName = ref('')
const mobileNumber = ref('')
const password = ref('')
const passwordConfirm = ref('')
</script>

<template>
  <div class="container">
    <div class="card o-hidden border-0 shadow-lg my-5">
      <div class="card-body p-0">
        <div v-if="messageStore.message" :class="`alert alert-${messageStore.messageType} m-3`" role="alert">
          {{ messageStore.message }}
        </div>
        <div class="row">
          <div class="col-lg-5 d-none d-lg-block bg-register-image"></div>
          <div class="col-lg-7">
            <div class="p-5">
              <div class="text-center">
                <h1 class="h4 text-gray-900 mb-4 text-center">ساخت حساب</h1>
              </div>
              <form class="user" v-on:submit.prevent>
                <div class="form-group row">
                  <div class="col-sm-6 mb-3 mb-sm-0">
                    <input v-model="firstName" type="text" class="form-control form-control-user" id="exampleFirstName"
                      placeholder="نام">
                      <ValidationErrors field="first_name" :errors="messageStore.errors"/>
                  </div>
                  <div class="col-sm-6">
                    <input v-model="lastName" type="text" class="form-control form-control-user" id="exampleLastName"
                      placeholder="نام خانوادگی">
                      <ValidationErrors field="last_name" :errors="messageStore.errors"/>
                  </div>
                </div>
                <div class="form-group">
                  <input v-model="mobileNumber" type="text" class="form-control form-control-user"
                    id="exampleInputNumber" placeholder="تلفن همراه">
                    <ValidationErrors field="mobile" :errors="messageStore.errors"/>
                </div>
                <div class="form-group row">
                  <div class="col-sm-6 mb-3 mb-sm-0">
                    <input v-model="password" type="password" class="form-control form-control-user" maxlength="11"
                      id="exampleInputPassword" placeholder="رمز عبور">
                      <ValidationErrors field="password" :errors="messageStore.errors"/>
                  </div>
                  <div class="col-sm-6">
                    <input v-model="passwordConfirm" type="password" class="form-control form-control-user"
                      maxlength="11" id="exampleRepeatPassword" placeholder="تکرار رمز عبور">
                      <ValidationErrors field="password_confirm" :errors="messageStore.errors"/>
                  </div>
                </div>
                <button class="btn btn-primary btn-user btn-block"
                  @click="authStore.register(firstName, lastName, mobileNumber, password, passwordConfirm)">
                  ساخت حساب
                </button>
              </form>
              <hr>
              <div class="text-center">
                <RouterLink class="small" to="/forgot-password">رمزت رو فراموش کردی ؟</RouterLink>
              </div>
              <div class="text-center">
                <RouterLink class="small" to="/login">قبلا ثبت نام کردم! ورود</RouterLink>
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

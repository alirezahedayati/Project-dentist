<script setup>
import { onBeforeMount, onUnmounted, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore, useAppointmentStore, useMessageStore } from '../stores'
import ValidationErrors from '../components/ValidationErrors.vue'

const router = useRouter()
const authStore = useAuthStore()
const appointmentStore = useAppointmentStore()
const messageStore = useMessageStore()

onBeforeMount(() => {
  if (!authStore.isLoggedIn) {
    router.push({ path: '/login', query: { nextUrl: '/reservation' }, replace: true })
  }
})

onUnmounted(() => {
  messageStore.$reset()
})

const firstName = ref('')
const lastName = ref('')
const mobileNumber = ref('')
const type = ref('checkup')
</script>

<template>
  <div id="reservation" class="section">
    <div class="section-center">
      <div class="container">
        <div class="row">
          <div class="reservation-form">
            <div class="form-header">
              <RouterLink to="/">
                <h1>نوبت گیری</h1>
              </RouterLink>
            </div>
            <form v-on:submit.prevent>
              <div v-if="messageStore.message" :class="`alert alert-${messageStore.messageType}`" role="alert">
                {{ messageStore.message }}
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group">
                    <span class="form-label">نام</span>
                    <input v-model="firstName" class="form-control" type="text" placeholder="نام خود را وارد کنید">
                    <ValidationErrors field="first_name" :errors="messageStore.errors" />
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-group">
                    <span class="form-label">نام خانوادگی</span>
                    <input v-model="lastName" class="form-control" type="text"
                      placeholder="نام خانوادگی خود را وارد کنید">
                    <ValidationErrors field="last_name" :errors="messageStore.errors" />
                  </div>
                </div>
              </div>
              <div class="form-group">
                <span class="form-label">تلفن همراه</span>
                <input v-model="mobileNumber" class="form-control" type="tel" placeholder="تلفن همراه خود را وارد کنید"
                  style="text-align: right;">
                <ValidationErrors field="mobile" :errors="messageStore.errors" />
              </div>
              <div class="form-group">
                <span class="form-label">نوع نوبت</span>
                <select v-model="type" class="form-select">
                  <option value="checkup">معاینه عمومی</option>
                  <option value="cosmetic">معاینه زیبایی</option>
                </select>
                <ValidationErrors field="type" :errors="messageStore.errors" />
              </div>
              <div class="form-btn">
                <button class="bg-primry submit-btn"
                  @click="appointmentStore.reserve(firstName, lastName, mobileNumber, type)">نوبت گیری</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@font-face {
  font-family: "iran-sans";
  src: url(../assets/font/IRANSansX-Bold.woff) format("woff");
}

.section {
  position: relative;
  height: 100vh;
}

.section .section-center {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
}

#reservation {
  font-family: "iran-sans";
  background-image: url('../assets/img/slide/pexels-cottonbro-studio-6528907.jpg');
  background-size: cover;
  background-position: center;
}

#reservation::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.4);
}

.reservation-form {
  max-width: 642px;
  width: 100%;
  margin: auto;
}

.reservation-form .form-header {
  text-align: center;
  margin-bottom: 25px;
}

.reservation-form .form-header h1 {
  font-size: 58px;
  text-transform: uppercase;
  font-weight: 700;
  color: #fff;
  margin: 0px;
}

.reservation-form>form {
  background-color: #3fbbc0;
  padding: 30px 20px;
  border-radius: 3px;
}

.reservation-form .form-group {
  position: relative;
  margin-bottom: 15px;
}

.reservation-form .form-control {
  background-color: #fff;
  border: none;
  height: 45px;
  border-radius: 3px;
  -webkit-box-shadow: none;
  box-shadow: none;
  font-weight: 400;
  color: #101113;
}

.reservation-form .form-control::-webkit-input-placeholder {
  color: rgba(16, 17, 19, 0.3);
}

.reservation-form .form-control:-ms-input-placeholder {
  color: rgba(16, 17, 19, 0.3);
}

.reservation-form .form-control::placeholder {
  color: rgba(16, 17, 19, 0.3);
}

.reservation-form input[type="date"].form-control:invalid {
  color: rgba(16, 17, 19, 0.3);
}

.reservation-form select.form-control {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.reservation-form select.form-control+.select-arrow {
  position: absolute;
  right: 0px;
  bottom: 6px;
  width: 32px;
  line-height: 32px;
  height: 32px;
  text-align: center;
  pointer-events: none;
  color: #101113;
  font-size: 14px;
}

.reservation-form select.form-control+.select-arrow:after {
  content: '\279C';
  display: block;
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}

.reservation-form .form-label {
  color: #fff;
  font-size: 12px;
  font-weight: 400;
  margin-bottom: 5px;
  display: block;
  text-transform: uppercase;
}

.reservation-form .submit-btn {
  color: #fff;
  background-color: #2cb273;
  font-weight: 700;
  height: 50px;
  border: none;
  width: 100%;
  display: block;
  border-radius: 3px;
  text-transform: uppercase;
}
</style>

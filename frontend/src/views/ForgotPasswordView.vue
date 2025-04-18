<script setup>
import { onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'

onMounted(() => {
  document.body.classList.add('bg-gradient-primary')
})

onUnmounted(() => {
  document.body.classList.remove('bg-gradient-primary')
})
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-xl-10 col-lg-12 col-md-9">
        <div class="card o-hidden border-0 shadow-lg my-5">
          <div class="card-body p-0">
            <div class="row">
              <div class="col-lg-6 d-none d-lg-block bg-password-image"></div>
              <div class="col-lg-6">
                <div class="p-5">
                  <div class="text-center">
                    <h1 class="h4 text-gray-900 mb-2">رمز خود را فراموش کرده ای؟</h1>
                    <p class="mb-4" style="font-size: 13px;">جهت بازیابی رمز عبور شماره خود را در اینجا وارد کنید و ما
                      پیامکی را حاوی لینک بازیابی رمز عبور برای شما ارسال خواهیم کرد</p>
                  </div>
                  <form class="user">
                    <div class="form-group">
                      <input type="text" class="form-control form-control-user" id="exampleInputNumber"
                        placeholder="تلفن همراه">
                    </div>
                    <RouterLink to="/login" class="btn btn-primary btn-user btn-block">
                      بازیابی رمز عبور
                    </RouterLink>
                  </form>
                  <hr>
                  <div class="text-center">
                    <RouterLink class="small" to="/register">ساخت حساب کاربری!</RouterLink>
                  </div>
                  <div class="text-center">
                    <RouterLink class="small" to="/login">قبلا ثبت نام کردی؟ ورود!</RouterLink>
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

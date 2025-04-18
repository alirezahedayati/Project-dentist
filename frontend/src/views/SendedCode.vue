<template>
    <div class="container">
      <!-- نمایش پیام موفقیت یا خطا -->
      <div v-if="messageStore.message" :class="`alert alert-${messageStore.messageType} m-3`" role="alert">
        {{ messageStore.message }}
      </div>
  
      <form class="user" @submit.prevent="submitVerificationCode">
        <input v-model="activeCode" type="text" class="form-control form-control-user" placeholder="کد تایید" />
        <ValidationErrors field="active_code" :errors="messageStore.errors" />
        <button type="submit" class="btn btn-primary btn-user btn-block">تایید کد</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, onBeforeMount, onMounted, onUnmounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore, useMessageStore } from '../stores';
  import ValidationErrors from '../components/ValidationErrors.vue';
  
  const router = useRouter();
  const authStore = useAuthStore();
  const messageStore = useMessageStore();
  
  onBeforeMount(() => {
    if (authStore.isLoggedIn) {
      router.push({ path: '/', replace: true });
    }
  });
  
  onMounted(() => {
    document.body.classList.add('bg-gradient-primary');
  });
  
  onUnmounted(() => {
    messageStore.$reset();
    document.body.classList.remove('bg-gradient-primary');
  });
  
  const activeCode = ref('');
  
  const submitVerificationCode = async () => {
    try {
      await authStore.verifyCode(activeCode.value);
      router.push({ path: '/', replace: true });
    } catch (error) {
      messageStore.message = 'کد تأیید اشتباه است.';
      messageStore.messageType = 'danger';
    }
  };
  </script>
  

<style scoped>
@import '../assets/css/sb-admin-2.min.css';
/* استایل های پایه برای بدنه */
body.bg-gradient-primary {
  background: linear-gradient(135deg, #4e73df, #224abe);
  color: #fff;
  font-family: 'IRANSans', sans-serif;
}

/* کانتینر اصلی */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

/* فرم تایید کد */
form.user {
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  padding: 30px;
  width: 100%;
  max-width: 400px;
}

/* فیلد ورودی */
form.user .form-control-user {
  height: 45px;
  border-radius: 5px;
  border: 1px solid #d1d3e2;
  font-size: 16px;
  padding: 10px;
  color: #6c757d;
  margin-bottom: 15px;
  transition: border-color 0.3s;
}

form.user .form-control-user:focus {
  border-color: #4e73df;
  outline: none;
  box-shadow: 0 0 5px rgba(78, 115, 223, 0.5);
}

/* دکمه تایید */
form.user .btn-user {
  background-color: #4e73df;
  color: #fff;
  border-radius: 5px;
  font-size: 16px;
  padding: 10px;
  transition: background-color 0.3s, transform 0.2s;
}

form.user .btn-user:hover {
  background-color: #2e59d9;
  transform: translateY(-2px);
}

/* پیام‌ها */
.alert {
  border-radius: 5px;
  font-size: 14px;
}

.alert.alert-success {
  background-color: #d4edda;
  color: #155724;
  border-color: #c3e6cb;
}

.alert.alert-danger {
  background-color: #f8d7da;
  color: #721c24;
  border-color: #f5c6cb;
}

/* استایل های موبایل */
@media (max-width: 576px) {
  form.user {
    padding: 20px;
  }

  form.user .btn-user {
    font-size: 14px;
  }

  form.user .form-control-user {
    font-size: 14px;
  }
}

</style>

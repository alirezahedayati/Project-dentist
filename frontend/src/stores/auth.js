import { defineStore } from 'pinia'
import { axios } from '../plugins'
import { useMessageStore } from '../stores'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    accessToken: null,
    refreshToken: null,
    mobileNumber: null,
  }),
  actions: {
    async verifyCode(activeCode) {
      const messageStore = useMessageStore();
      try {
        const response = await axios.post('/verify-code', {
          mobile: this.mobileNumber, // شماره موبایل ذخیره‌شده
          active_code: activeCode,  // کد واردشده توسط کاربر
        });
    
        // ذخیره توکن‌ها و تکمیل ثبت‌نام
        this.accessToken = response.data?.access_token;
        this.refreshToken = response.data?.refresh_token;
        this.isLoggedIn = true;
    
        messageStore.$reset();
        this.$router.push({ path: '/', replace: true });
      } catch (error) {
        // مدیریت خطا در صورت وارد کردن کد اشتباه
        const message = error.response?.data.error || 'کد فعال‌سازی اشتباه است.';
        messageStore.message = message;
        messageStore.messageType = 'danger';
      }
    },
        
    async login(mobileNumber, password) {
      const messageStore = useMessageStore()
      try {
        const response = await axios.post('/login', {
          mobile: mobileNumber,
          password: password,
        })

        this.mobileNumber = mobileNumber
        this.accessToken = response.data?.access_token
        this.refreshToken = response.data?.refresh_token
        this.isLoggedIn = true

        messageStore.$reset()
        this.$router.push({ path: this.$router.currentRoute.value.query.nextUrl || '/', replace: true })
      } catch (error) {

        this.accessToken = null
        this.refreshToken = null
        this.mobileNumber = null
        this.isLoggedIn = false

        const errors = error.response?.data.errors || []
        const message = error.response?.data.error || 'خطایی رخ داده است.'

        messageStore.errors = errors
        messageStore.message = message
        messageStore.messageType = 'danger'
      }
    },
    async register(firstName, lastName, mobileNumber, password, passwordConfirm) {
      const messageStore = useMessageStore();
      try {
        // ارسال درخواست ثبت‌نام
        await axios.post('/register', {
          first_name: firstName,
          last_name: lastName,
          mobile: mobileNumber,
          password: password,
          password_confirm: passwordConfirm,
        });

        // ذخیره شماره موبایل برای ارسال در مرحله تأیید کد
        this.mobileNumber = mobileNumber;

        // هدایت به صفحه SendedCode.vue
        this.$router.push({ path: '/sended-code', replace: true });
      } catch (error) {
        // مدیریت خطا
        this.mobileNumber = null;
        const errors = error.response?.data.errors || [];
        const message = error.response?.data.error || 'خطایی رخ داده است.';

        messageStore.errors = errors;
        messageStore.message = message;
        messageStore.messageType = 'danger';
      }
    },
    
    logout() {
      const messageStore = useMessageStore()
      this.$reset()
      messageStore.$reset()
      this.$router.push({ path: this.$router.currentRoute.value.query.nextUrl || '/', replace: true })
    }
  },
  persist: true,
})

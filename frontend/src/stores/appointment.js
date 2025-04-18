import { defineStore } from 'pinia'
import { axios } from '../plugins'
import { useMessageStore } from '../stores'

export const useAppointmentStore = defineStore('appointment', {
    state: () => ({
        appointments: [],
    }),
    actions: {
        async reserve(firstName, lastName, mobileNumber, type) {
            const messageStore = useMessageStore()
            try {
                const response = await axios.post('/appointments', {
                    first_name: firstName,
                    last_name: lastName,
                    mobile: mobileNumber,
                    type: type || 'checkup',
                })

                messageStore.errors = []
                messageStore.message = response.data?.message || ''
                messageStore.messageType = 'success'

                // انتقال کاربر به مسیر "/" بعد از 2 ثانیه
                setTimeout(() => {
                    this.$router.push({ path: '/', replace: true });
                }, 2000); // زمان به میلی‌ثانیه

            } catch (error) {

                const errors = error.response?.data.errors || []
                const message = error.response?.data.error || 'خطایی رخ داده است.'

                messageStore.errors = errors
                messageStore.message = message
                messageStore.messageType = 'danger'
            }
        },
        async fetchAppointments() {
            const messageStore = useMessageStore()
            try {
                const response = await axios.get('/appointments')
                this.appointments = response.data || []
                messageStore.$reset()
            } catch (error) {
                const errors = error.response?.data.errors || []
                const message = error.response?.data.error || 'خطایی رخ داده است.'
                messageStore.errors = errors
                messageStore.message = message
                messageStore.messageType = 'danger'
            }
        },
    },
})
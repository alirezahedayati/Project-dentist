import { defineStore } from 'pinia'
import { axios } from '../plugins'
import { useAuthStore, useMessageStore } from '../stores'

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
        users: [],
    }),
    actions: {
        async me() {
            if (this.user) {
                return this.user
            }
            const authStore = useAuthStore()
            try {
                const response = await axios.get('/users/me')
                this.user = response.data || null
                return this.user
            } catch (error) {
                authStore.logout()
                this.$router.push({ path: '/', replace: true })
            }
            return null
        },
        async fetchUsers() {
            const messageStore = useMessageStore()
            try {
                const response = await axios.get('/users')
                this.users = response.data || []
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
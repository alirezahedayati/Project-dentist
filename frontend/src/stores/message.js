import { defineStore } from 'pinia'

export const useMessageStore = defineStore('message', {
  state: () => ({
    message: '',
    messageType: 'danger',
    errors: [],
  }),
  actions: {},
  persist: false,
})

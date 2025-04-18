<script setup>
import { onBeforeMount } from 'vue'
import { useAuthStore } from '../stores'

const authStore = useAuthStore()

onBeforeMount(() => {
  authStore.logout()
})
</script>
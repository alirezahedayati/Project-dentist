import axios from 'axios'
import { useAuthStore } from '../stores'

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

instance.interceptors.request.use(config => {
    const authStore = useAuthStore()
    if (authStore.accessToken) {
        config.headers.Authorization = `Bearer ${authStore.accessToken}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
})

export default instance
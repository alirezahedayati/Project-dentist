import { createApp, markRaw } from 'vue'
import App from './App.vue'
import { pinia, router } from './plugins'

import 'bootstrap/dist/css/bootstrap.rtl.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

/* Design system: order matters — tokens → fonts → base → feature layers */
import './styles/tokens.css'
import './styles/fonts.css'
import './styles/base.css'
import './styles/admin.css'
import './styles/auth.css'

const app = createApp(App)

pinia.use(({ store }) => {
    store.$router = markRaw(router)
})

app.use(pinia)
app.use(router)

app.mount('#app')

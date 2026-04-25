import './assets/main.css'
import './assets/fanta.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import persistedState from 'pinia-plugin-persistedstate'

const app = createApp(App)

app.use(createPinia().use(persistedState))
app.use(router)

app.mount('#app')

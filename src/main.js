import { createApp } from 'vue'
import { useElement } from './plugins/useElement'
import App from './App.vue'
import router from './router'
import store from './store'
import { nanoid } from "nanoid"
import axios from './plugins/axios'

const app = createApp(App)
app.config.globalProperties.nanoid = nanoid
app.config.globalProperties.axios = axios
app.config.globalProperties.baseURL = process.env.NODE_ENV === 'development'?"http://localhost:3000":""
useElement(app)
app.use(store).use(router).mount('#app')

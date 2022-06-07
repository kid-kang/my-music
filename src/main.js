import { createApp } from 'vue'
import { useElement } from './plugins/useElement'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './plugins/axios'

const app = createApp(App)
app.config.globalProperties.axios = axios
// app.config.globalProperties.baseURL = process.env.NODE_ENV === 'development'?"http://localhost:3000":""
app.config.globalProperties.baseURL = "https://music-api-ten-sand.vercel.app"
useElement(app)
app.use(store).use(router).mount('#app')

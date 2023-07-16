import { createPinia } from 'pinia'
import { createApp } from 'vue'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import App from './App.vue'
import './assets/main.css'
import router from './router'

createApp(App)
  .use(createPinia())
  .use(router)
  .use(Toast, {
    transition: 'Vue-Toastification__fade',
  })
  .mount('#app')

import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import Icon from '@/components/Icon.vue'
import 'element-plus/dist/index.css'
import './styles/index.scss'

const app = createApp(App)

app.component('Icon', Icon).use(router).use(createPinia()).mount('#app')

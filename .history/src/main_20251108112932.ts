import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import LegendaryCursor from 'legendary-cursor'

window.addEventListener('load', () => {
  LegendaryCursor.init({
    lineSize: 0.15,
    opacityDecrement: 0.55,
    speedExpFactor: 0.8,
    lineExpFactor: 0.6,
    sparklesCount: 65,
    maxOpacity: 0.99,
  })
})

const app = createApp(App)
app.use(router)
app.mount('#app')

import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import LegendaryCursor from 'legendary-cursor'
import { createBackground } from './utils/background'

window.addEventListener('load', () => {
  // 初始化传奇光标
  LegendaryCursor.init({
    lineSize: 0.15,
    opacityDecrement: 0.55,
    speedExpFactor: 0.8,
    lineExpFactor: 0.6,
    sparklesCount: 65,
    maxOpacity: 0.99,
  })

  // 创建背景粒子效果
  createBackground({
    containerId: 'background',
    particleSize: 90,
    rotationSpeed: 0.003,
    timeSpeed: 0.5,
  })
})

const app = createApp(App)
app.use(router)
app.mount('#app')

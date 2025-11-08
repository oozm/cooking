import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import LegendaryCursor from 'legendary-cursor'
window.addEventListener('load', () => {
  console.log('load')

  LegendaryCursor.init({
    lineSize: 0.15,
    opacityDecrement: 0.55,
    speedExpFactor: 0.8,
    lineExpFactor: 0.6,
    sparklesCount: 65,
    maxOpacity: 0.99, // should be a number between [0 ... 1]
    // texture1:         "http://path_to_texture",      // texture displayed on mouse hover
    // texture2:         "http://path_to_texture",      // texture displayed on mouse click
    // texture3:         "http://path_to_texture",      // texture displayed on sparkles
  })
})

createApp(App).mount('#app')

import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/keyframes',
    name: 'Keyframes',
    component: () => import('../views/Keyframes.vue'),
  },
  {
    path: '/particles',
    name: 'Particles',
    component: () => import('../views/Particles.vue'),
  },
  {
    path: '/geometry',
    name: 'Geometry',
    component: () => import('../views/Geometry.vue'),
  },
  {
    path: '/shaders',
    name: 'Shaders',
    component: () => import('../views/Shaders.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router


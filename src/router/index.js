import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/Loginpage.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/registerpage.vue')
    },
    {
      path: '/rencana',
      name: 'rencana',
      component: () => import('../views/rencanapage.vue')
    }
  ]
})

export default router

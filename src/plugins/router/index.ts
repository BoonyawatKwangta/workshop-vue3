import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/BlankLayout.vue'),
      meta: { requireAuth: false },
      children: [
        {
          path: '',
          name: 'LoginView',
          component: () => import('@/views/LoginView.vue'),
        },
        {
          path: 'notfound',
          name: 'NotfoundView',
          component: () => import('@/views/NotfoundView.vue'),
        },
      ]
    },
    {
      path: '/default',
      component: () => import('@/layouts/DefaultLayout.vue'),
      meta: { requireAuth: true },
      children: [
        {
          path: '',
          name: 'HomeView',
          component: () => import('@/views/HomeView.vue'),
        },
        {
          path: 'product/:id',
          name: 'ProductView',
          component: () => import('@/views/ProductView.vue'),
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/notfound',
    },
  ],
})

// ต้องถอดรหัส
const isAuthenticated = localStorage.getItem('auth_token')
console.log('isAuthenticated', isAuthenticated)

router.beforeEach((to, form, next) => {
  if (
    to.name !== 'LoginView' && 
    to.meta?.requireAuth &&
    !isAuthenticated
  ) {
    next({ name: 'LoginView' })
  } else {
    next()
  }
})

export default router

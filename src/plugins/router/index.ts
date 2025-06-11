import { createRouter, createWebHistory } from 'vue-router'
import { jwtDecode } from 'jwt-decode'

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
          name: 'LoginPage',
          component: () => import('@/views/LoginPage.vue'),
        },
        {
          path: 'notfound',
          name: 'NotfoundPage',
          component: () => import('@/views/NotfoundPage.vue'),
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
          name: 'HomePage',
          component: () => import('@/views/HomePage.vue'),
        },
        {
          path: 'product/:id',
          name: 'ProductPage',
          component: () => import('@/views/ProductPage.vue'),
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/notfound',
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // ตรวจสอบว่า Token ใช้งานได้หรือไม่ (ถูกต้อง และไม่หมดอายุ)
  // - คืนค่า true ถ้า token ใช้งานได้ (decode ผ่าน + อายุไม่เกิน 2 ชม.)
  // - คืนค่า false ถ้า token ใช้งานไม่ได้ (decode ไม่ผ่าน หรือหมดอายุ)
  function isTokenValid(token: string): boolean {
    try {
      interface JWT {
        iat: number
        sub: number
        user: string
      }

      const decoded: JWT = jwtDecode(token)

      // Token นี้มีอายุ 2 ชั่วโมง (7200 วินาที) หลังจาก iat
      const expired = decoded.iat && Date.now() >= ((decoded.iat + 7200) * 1000)
      // Token จะถูกต้องเฉพาะกรณี decode ผ่าน และยังไม่หมดอายุ
      return !expired
    } catch {
      // ถ้า decode ไม่ผ่าน ถือว่า token ใช้งานไม่ได้
      return false
    }
  }

  // tokenValid = token ใช้งานได้ (decode ได้ + อายุไม่เกิน 2 ชั่วโมง)
  const tokenValid = isTokenValid(authStore._ssAcT)

  // ถ้ากำลังจะไปหน้า Login ขณะ token ใช้งานได้ ให้ redirect กลับ HomePage
  if (['LoginPage'].includes(to.name as string) && tokenValid) {
    next({ name: 'HomePage' })
    return
  }
  
  // ถ้าเส้นทางที่กำลังจะไปต้องการ token (requiresAuth) 
  if (to.meta.requiresAuth) {
    // ถ้า token ใช้งานไม่ได้ ให้ redirect ไปหน้า Login
    if (!tokenValid) {
      next({ name: 'LoginPage' })
      return
    }
  }
  next()
})


export default router

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login ',
    component: () => import('../components/Login')
  },
  {
    path: '/home',
    name: 'Home ',
    component: () => import('../components/Home')
  }
]

const router = new VueRouter({
  routes
})
//路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const openId = sessionStorage.getItem('openId')
  if (!openId) return next('/login')
  next()
})
export default router

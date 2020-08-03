import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '/login',
    name: 'Login ',
    component: () => import('../components/Login')
  },
  {
    path: '/home',
    name: 'Home ',
    component: () => import('../components/Home'),
    redirect: '/welcome',
    children: [{
      path: '/welcome',
      component: () => import('../views/Welcome')
    }, {
      path: '/user',
      component: () => import('../views/User')
    }, {
      path: '/rights',
      component: () => import('../views/power/Rights')
    }, {
      path: '/roles',
      component: () => import('../views/power/Roles')
    }]
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

import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入
// import Login from '@/views/login'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('@/views/login')
  }
]

const router = new VueRouter({
  routes
})

export default router

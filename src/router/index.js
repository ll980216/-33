import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入
// import Login from '@/views/login'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    component: () => import('@/views/Layout'),
    redirect: '/ ',
    children: [
      {
        path: '/ ',
        component: () => import('@/views/home')
      },
      {
        path: '/video',
        component: () => import('@/views/video')
      },
      {
        path: '/QA',
        component: () => import('@/views/QA')
      },
      {
        path: '/profile',
        component: () => import('@/views/my')
      }
    ]
  },
  {
    path: '/search',
    component: () => import('@/views/Search')
  }
]

const router = new VueRouter({
  routes
})

export default router

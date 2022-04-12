import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/HomeView.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  // 配置登陆页面的路由
  {
    path: '/',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router

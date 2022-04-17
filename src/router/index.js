import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import Register from  '../views/Register.vue'
import Index from '../views/Index.vue'
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
  },
  {
    path:'/register',
    name:'register',
    component: Register
  },
  {
    path: '/index',
    name: 'Index',
    component: Index
  },
]

const router = new VueRouter({
  routes
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import Register from  '../views/Register.vue'
import Index from '../views/Index.vue'
import Housedata from "@/views/Housedata.vue";
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
    component: Index,
    children:[
      {
        path:'/housedata',
        name:'Housedata',
        component: Housedata
      }
    ]
  },




]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router

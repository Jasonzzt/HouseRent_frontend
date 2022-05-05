import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from  '../views/Register.vue'
import Index from '../views/Index.vue'
import Housedata from "../views/Housedata.vue"
import UsrInfo from "@/views/UsrInfo.vue"
import Message from "@/views/Message.vue";
import HouseInfo from "@/views/HouseInfo";
import HouseRelease from "@/views/HouseRelease";
Vue.use(VueRouter)

const routes = [

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
      },
      {
        path:'/usrInfo',
        name: 'UsrInfo',
        component: UsrInfo
      },
      {
        path:'/message',
        name: 'Message',
        component: Message
      },
      {
        path:'/houseinfo',
        name:'Houseinfo',
        component: HouseInfo
      },
      {
        path:'/houserelease',
        name: "HouseRelease",
        component: HouseRelease
      }
    ]
  },



]

const router = new VueRouter({
  routes
})

export default router

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    /* 记录登录状态 */
    isLogin:false,
    /* 我的信息 */
    myInfo:{
      img:'https://img0.baidu.com/it/u=3286620577,661592788&fm=253&fmt=auto&app=138&f=JPEG?w=200&h=200',
      name:'',
      username:''
    },
    /* 别人的信息（特指聊天对象） */
    userInfo:{
      img:'',
      name:'',
      username:''
    },
    houseInfo:{
      houseId:''
    },
    /* 用户列表 */
    userList: [{
      name: '王小虎',
      username:'',
      img: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
    }, {
      name: '郑泷',
      img: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
    }, {
      name: '小蛮',
      img: 'http://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/30adcbef76094b36ba49777aa5cc7cd98c109d49.jpg'
    }, {
      name: '张云',
      img: 'http://img.52z.com/upload/news/image/20180111/20180111085521_86389.jpg'
    },{
      name: '张云',
      img: 'http://img.52z.com/upload/news/image/20180111/20180111085521_86389.jpg'
    },{
      name: '张云',
      img: 'http://img.52z.com/upload/news/image/20180111/20180111085521_86389.jpg'
    },{
      name: '张云',
      img: 'http://img.52z.com/upload/news/image/20180111/20180111085521_86389.jpg'
    },{
      name: '张云',
      img: 'http://img.52z.com/upload/news/image/20180111/20180111085521_86389.jpg'
    },{
      name: '张云',
      img: 'http://img.52z.com/upload/news/image/20180111/20180111085521_86389.jpg'
    },{
      name: '张云',
      img: 'http://img.52z.com/upload/news/image/20180111/20180111085521_86389.jpg'
    },{
      name: '张云',
      img: 'http://img.52z.com/upload/news/image/20180111/20180111085521_86389.jpg'
    }],
    /* 聊天记录 */
    chatMessageList: [
      {
        username: "王小虎",
        list: [
          {
            type: "my",
            msg: "你好啊",
          },
          {
            type: "user",
            msg: "你好啊",
          },
          {
            type: "user",
            msg: "你要租房吗？",
          },
        ],
      },
      {
        username: "小蛮",
        list: [
          {
            type: "my",

            msg: "你好啊",
          },
          {
            type: "user",

            msg: "你好啊",
          },
            ]
      },
    ],
  },
  mutations: {
    setUserInfo(state,data){
      state.userInfo=data;
      //alert(state.userInfo.name)
    },
    addMessage(state,data){
      for(let i=0;i<state.chatMessageList.length;i++){
        if(state.chatMessageList[i].username==state.userInfo.name){
          //alert("?");
          state.chatMessageList[i].list.push(data);
          //alert("ok");
          break;
        }
      }
    },
    setHouseInfo(state,data){
      state.houseInfo=data;
      //alert(state.houseInfo.houseId);
    }

  },
  actions: {},
  modules: {},

})
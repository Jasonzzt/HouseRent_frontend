import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    /* 记录登录状态 */
    isLogin: false,
    /*WebSocket*/
    ws: '', athis: this,
    /* 我的信息 */
    myInfo: {
      img: 'https://img0.baidu.com/it/u=3286620577,661592788&fm=253&fmt=auto&app=138&f=JPEG?w=200&h=200',
      name: '',
      username: ''
    },
    /* 别人的信息（特指聊天对象） */
    userInfo: {
      img: '',
      name: '',
      username: ''
    },
    houseInfo: {
      id:''
    },
    /* 用户列表 */
    userList: [{
      name: '王小虎',
      username: '123',
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
    },],
    /* 聊天记录 */
    chatMessageList: [
      {
        username: "123",
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
    houseList:[
      {
        id:'001',
        img:['https://pic4.ajkimg.com/display/xinfang/b57d6d4baf27754c01996e42cda8fece/403x335n.jpg'],
        neighborhood: '幸福小区',
        district:'江宁区',
        type:'两室',
        area:'100',
        cost:'2000',
        layer:'2楼',
        joint:'true',
        information:'不错',
        host:''
      },
      {
        id:'002',
        img:['https://pic4.ajkimg.com/display/xinfang/b57d6d4baf27754c01996e42cda8fece/403x335n.jpg'],
        neighborhood: '华都福林',
        district:'建邺区',
        type:'三室',
        area:'150',
        cost:'3000',
        layer:'13楼',
        joint:'false',
        information:'还行',
        host:''
      }
    ],
    /*详细的房屋信息的列表*/
    // houseList:[
    //   {
    //     houseId:'00001',
    //     img:'https://cn.bing.com/images/search?view=detailV2&ccid=w%2f%2fQ0Suq&id=03E680C18ED72818E3F6FF587C5A9E98FF57F669&thid=OIP.w__Q0SuqqEpRK8oMPGvq7QHaEi&mediaurl=https%3a%2f%2fimg.zcool.cn%2fcommunity%2f01dd505ca21e53a8012141688ba0ea.jpg%401280w_1l_2o_100sh.jpg&exph=785&expw=1280&q=%e6%88%bf%e5%ad%90&simid=608050322981347852&FORM=IRPRST&ck=C0A8B7ACAA6708782286EAF3FC3B5F5A&selectedIndex=1',
    //     neighborhood: '秣陵街道东南大学路2号',
    //     district:'地区1',
    //     type:'三室一厅',
    //     area:'200平',
    //     cost:'9000元/月',
    //     layer:'5',
    //     joint:'合租',
    //     information:'坐北朝南，花园小区，临近地铁',
    //     host:'9990'
    //   },
    //   {
    //
    //   }
    // ]

  },
  mutations: {
    setUserInfo(state, data) {
      state.userInfo = data;
      //alert(state.userInfo.name)
    },
    addMessage(state, data) {
      let i;
      for (i = 0; i < state.chatMessageList.length; i++) {
        if (state.chatMessageList[i].username == state.userInfo.username) {
          //alert("?");
          state.chatMessageList[i].list.push(data);
          //alert("ok");
          break;
        }
      }
      if (i == state.chatMessageList.length) {
        state.chatMessageList.push({username: state.userInfo.username, list: []});
        state.chatMessageList[i].list.push(data);
      }
    },
    setHouseInfo(state, data) {
      state.houseInfo = data;
      //alert(state.houseInfo.houseId);
    },
    setData(state, data) {
      state.myInfo.username = data.userName;
      state.myInfo.name = data.name;
      state.myInfo.img = data.img;
      state.userList = data.userList;
      state.chatMessageList = data.chatMessageList;
      state.isLogin = true;
      state.athis=data.that
    },
    setHouseData(state,data){
      state.houseList=data.houseList;
    },
    setWS(state, data,that) {

      state.ws = new WebSocket("ws://localhost:8080/ws");

      if (state.ws.readyState == state.ws.CONNECTING) console.log("ws 连接成功");
      state.ws.onopen = function () {
        state.ws.send(JSON.stringify({"username": state.myInfo.username}));
      }

      state.ws.onmessage = function (evt) {
        let formdata = new FormData();
        formdata.append("username", state.myInfo.username);
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        state.athis.$axios.post("http://localhost:8080/getuser", formdata, config).then(res => {
          let msg = res.data.msg;
          state.userList = msg.userlist;
          state.chatMessageList = msg.chatmessagelist;
          alert(state.myInfo.username+"收到消息！")

        })
      }
    }
    },
    actions: {},
    modules: {},
  }
)


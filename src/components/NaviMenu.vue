<template>
  <div id="NavMenu">
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
    >

      <template v-for="item in navMenuData">
        <el-menu-item  :index="item.index" v-if="!item.child">{{item.name}}</el-menu-item>

        <el-submenu :index="item.index" v-if="item.child" >
          <template slot="title">{{item.name}}</template>
          <template v-for="item2 in item.child">
            <el-menu-item :index="item2.index">{{item2.name}}</el-menu-item>
          </template>
        </el-submenu>
      </template>
      <template>
        <div class="head_portrait">
          <a href="#/usrInfo" class="user">
            <span class="user_icon">
              <el-avatar :src="myInfo.img"></el-avatar>
            </span>
          </a>
        </div>
      </template>
      <template>
        <div class="server">
          <el-button type="text" @click="open" icon="el-icon-s-custom">客服</el-button>
        </div>
      </template>
    </el-menu>
  </div>
</template>

<script>
import store from "../store/index";
export default {
  name: "NaviMenu",

  data() {
    return {
      activeIndex: "housedata",
      navMenuData: [
        { index: "housedata", name: "住房信息" },
        { index: "message", name: "我的消息" },
        {
          index: "2",
          name: "租房记录",
          child: [{ index: "2-1", name: "合同期内租房" },{ index: "2-2", name: "已完成租赁" },{ index: "2-3", name: "已收藏租赁住房" }]
        },

      ],
    };
  },
  methods: {
    open() {
      let r=false;
      //客服问题
      let problem="";
      while(!r){
        problem =prompt("请输入你的问题(客服留言)",problem);
        //alert(problem);
        if(problem==null) {
          break;
        }
        else if(problem!=""){
          let r=confirm("请确认你的问题："+problem);
        }
        else{
          alert("请输入内容");
        }
      }
    }
  },
  mounted(){
    document.getElementsByClassName("el-menu-item is-active")[0].click()
  },
  computed:{
    myInfo(){
      return store.state.myInfo;
    }
  }
};

</script>

<style scoped>
.head_portrait{
  position: absolute;
  right: 20px;
  top: 10px;
}
.server{
  position: absolute;
  right: 80px;
  top: 10px;
}
</style>
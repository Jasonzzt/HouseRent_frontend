<template>
  <div class="div1" style="height: 480px ;overflow-y:scroll"  id="flow" >
    <!-- 先循环找到你想要聊天的那个人 -->
    <div v-for="(list, index) in msgList" :key="index" >
      <!-- 有聊天记录：循环聊天记录 -->
      <div v-if="list.username==userInfo.username" >
        <!-- 再循环显示聊天记录 -->
        <div  v-for="(msg, index) in list.list" :key="index">
          <p :class="{'left':msg.type=='user'}" v-if="msg.type=='user'">
            <el-avatar :src="userInfo.img" ></el-avatar>
            <span class="content" >{{msg.msg}}</span>
          </p>
          <p :class="{'right':msg.type=='my'}" v-if="msg.type=='my'">
            <span class="content" >{{msg.msg}}</span>
            <el-avatar :src="myInfo.img" ></el-avatar>
          </p>
        </div>
          </div>
        </div>
      </div>
</template>

<script>

import store from "../store/index";
export default {
  data() {
    return {
      oldScrollTop:0,
      scrollFlag:true,
      Intervall:null,

    };
  },

  methods:{


  },
  mounted() {
  },

  computed:{
    myInfo(){
      return store.state.myInfo;
    },
    userInfo(){
      return store.state.userInfo;
    },
    msgList(){
      return store.state.chatMessageList;
    }
  },
};

</script>

<style scoped>
.div1 {
  width: 100%;
}
.div1 P{
  width: 100%;
  height: 50px;
}
.content{
  background-color: antiquewhite;
  padding: 10px;
  border-radius: 5px;
  font-weight: bold;

}
.right{
  text-align: right;
}
.left{
  text-align: left;

}

</style>
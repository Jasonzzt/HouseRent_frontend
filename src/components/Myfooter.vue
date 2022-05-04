<template>
  <el-input placeholder="请输入内容" v-model="input" @keyup.enter.native="send"> </el-input>
</template>

<script>
import store from "../store/index";
export default {
  name: "Myfooter",
  data() {
    return {
      input:'',
      myName:'',
      userName:'',
    }
  },
  methods: {
    send(){

      /* 发送消息 */
      store.commit('addMessage', {type:"my",msg:this.input});
      let a={"my":store.state.myInfo.username,"user":store.state.userInfo.username,"msg":this.input}
      //alert(a)
      //alert(JSON.stringify(a))
      store.state.ws.send(JSON.stringify(a));
      /* 清空输入框 */
      this.input='';
    },
  },
  computed:{
    userInfo(){
      return store.state.userInfo;
    },
    chatMessageList(){
      return store.state.chatMessageList;
    },
    ws(){
      return store.state.ws;
    },
    myInfo(){
      return store.state.myInfo;
    }
  }
}
</script>

<style scoped>

</style>
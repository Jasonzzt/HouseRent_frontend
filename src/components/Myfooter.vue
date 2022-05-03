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

    }
  },
  methods: {
    send(){
      /* 发送消息 */
      //alert(this.input);
      store.commit('addMessage', {type:"my",time:"",msg:this.input});
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
    }
  }
}
</script>

<style scoped>

</style>
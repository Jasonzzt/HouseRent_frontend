<template>
  <el-input placeholder="请输入内容" v-model="input" @keyup.enter.native="send"> </el-input>
</template>

<script>
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
      alert(this.input);
      /* 清空输入框 */
      this.input='';
    },
  },
}
</script>

<style scoped>

</style>
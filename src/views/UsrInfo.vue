<template>
<!--  /*应该设置一个isshow开始只显示我的信息，如果点击修改再变成文本输入框*/-->
  <div >
    <el-button  style="position: absolute;right: 30px;top:70px" type="primary" @click="change">修改昵称</el-button>
    <el-button  v-show="isShow" style="position: absolute;right: 120px;top:70px" type="primary" @click="commit">提交</el-button>

    <div style="margin-bottom:0px;margin-left: 20px;width: 100px; height: 100px;display: inline">
      <el-image
          :src="mydata.img"
      ></el-image>
    </div>

<!--    <div >
      <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
      >
        <el-button v-show="isShow" style="position:absolute;right:675px;bottom: 100px" size="small" type="primary">点击上传本地图片</el-button>
      </el-upload>
    </div>-->


      <div style="position:absolute;margin-left: 700px;top: 200px">
        <span style="font-size:20px;font-weight: bold">ID</span>
          <span style="font-size:20px;color:#41b9a6;margin-left: 40px;font-weight: bold">{{ mydata.username }}</span>
      </div>

      <div style="position:absolute;margin-left: 690px;top: 300px" >
        <span style="font-size:20px;font-weight: bold">昵称</span>
        <span v-show="!isShow" style="font-size:20px;color:#41b9a6;margin-left: 40px;font-weight: bold">{{ mydata.name }}</span>
      </div>
    <el-input
        style="position: absolute;top: 305px;left:770px;width:200px"
        type="text"
        v-model="newName"
        maxlength="8"
        show-word-limit
        v-show="isShow"
    ></el-input>
    <el-button  style="position: absolute;right: 30px;top:150px" type="success" @click="exit">退出登录</el-button>

  </div>


</template>

<script>
import store from "../store/index";
import Element from "element-ui";
import router from "@/router";
export default {
  name: "UsrInfo",
  data(){
    return{
      isShow:false,
      newName:'',

    };
  },
  methods:{
    change(){
      this.isShow=true;
      this.newName=this.mydata.name;
      },
    exit(){
      let formdate=new FormData();
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      this.$axios.post('http://localhost:8080/exit',formdate,config);
      router.push('/');
    },
    commit(){
      if(this.newName!='') {
        let formdata = new FormData();
        formdata.append("name", this.newName);
        formdata.append("username", this.$store.state.myInfo.username);
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        this.$axios.post('http://localhost:8080/updatename', formdata, config).then(res => {
          let msg = res.data;
          if (msg == true) {
            Element.Message.success("修改成功");
            this.isShow = false;
            store.commit("refreshMyData", {newName: this.newName});
          }
        })
      }
      else{
        Element.Message.error("请输入至少一个字符");
      }
    },

  },
  computed:{
    mydata() {
      return store.state.myInfo;
    }
  },

}
</script>

<style scoped>
input{
  outline-style: none ;
  margin-left: 20px;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 13px 14px;
  width: 620px;
  font-size: 14px;
  /*font-weight: 700;*/
  /*font-family: "Microsoft soft";*/
}

.input:focus{
  border-color: #66afe9;
  outline: 0;
  -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)
}
</style>
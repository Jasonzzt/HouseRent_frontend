<template>
<!--  /*应该设置一个isshow开始只显示我的信息，如果点击修改再变成文本输入框*/-->
  <div >
    <el-button  style="position: absolute;right: 30px;top:70px" type="primary" @click="change">修改</el-button>
    <el-button  v-show="isShow" style="position: absolute;right: 120px;top:70px" type="primary" @click="commit">提交</el-button>

    <div style="margin-bottom:0px;margin-left: 20px;width: 100px; height: 100px;display: inline">
      <el-image
          :src="mydata.img"
      ></el-image>
    </div>

    <div >
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
        <el-button style="position:absolute;right:500px;top: 250px" size="small" type="primary">点击上传本地图片</el-button>
      </el-upload>
    </div>

      <div style="position:absolute;margin-left: 0px;top: 200px">
        <span style="font-size:40px">id</span>
          <span style="font-size:40px;color:#41b9a6;margin-left: 40px">{{ mydata.username }}</span>
      </div>

      <div style="position:absolute;margin-left: 0px;top: 300px" >
        <span style="font-size:40px">姓名</span>
        <span style="font-size:40px;color:#41b9a6;margin-left: 40px">{{ mydata.name }}</span>
      </div>
    <input
        style="position: absolute;top: 480px;left: 120px"
        placeholder="输入新的姓名"
        class="input"
        v-model="newName"
        v-show="isShow"
    ></input>

    <div style="position:absolute;margin-left: 0px;top: 420px" >
      <span style="font-size:40px">密码</span>
      <span style="font-size:40px;color:#41b9a6;margin-left: 40px">{{ mydata.key }}</span>
    </div>
    <input
        style="position: absolute;top: 600px;left: 120px"
        placeholder="输入新的密码"
        v-show="isShow"
        v-model="newKey">
    </input>

    <div> </div>
  </div>

</template>

<script>
import store from "../store/index";
export default {
  name: "UsrInfo",
  data(){
    return{
      isShow:false,
      newName:'',
      newKey:'',
      form:{
        name:'',
        password:'',
      },
      fileList: [],
    };
  },
  methods:{
    change(){
      this.isShow=true;

      },
    commit(){
      alert("信息修改成功");
      this.isShow=false;
      store.commit("refreshMyData",{newName:this.newName,newKey:this.newKey});
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    }
  },
  computed:{
    mydata() {
      return store.state.myInfo;//对了
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
<template>
  <div :xl="6" :lg="7" class="bg-login">
    <!--logo-->
    <el-image :src="require('@/assets/logo1.png')" class="logo"/>
    <!--标题-->
    <el-row type="flex" class="row-bg row-two" justify="center" align="middle">
      <el-col :span="6"></el-col>
      <el-col :span="6">
        <!--标题-->
        <h1 class="title">住房租赁平台登录</h1>
      </el-col>
      <el-col :span="6"></el-col>
    </el-row>
    <!--form表单-->
    <el-row type="flex" class="row-bg card" justify="center" align="bottom">
      <el-col :span="7" class="login-card">
        <!--loginForm-->
        <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="21%" class="loginForm">
          <el-form-item label="账户" prop="username" style="width: 380px">
            <el-input v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" style="width: 380px">
            <el-input type="password" v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="code" style="width: 380px">
            <el-input v-model="loginForm.code" class="code-input" style="width: 70%;float: left"></el-input>
            <!--验证码图片-->
            <el-image :src="codeImg" class="codeImg"></el-image>
          </el-form-item>
          <el-form-item class="btn-ground">
            <el-button type="primary" @click="submitForm('loginForm')">立即登陆</el-button>
            <el-button @click="register()">注册用户</el-button>
            <el-button @click="resetForm('loginForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>


  </div>
</template>

<script>
import Element from 'element-ui';
import router from "@/router";
import store from "@/store";
export default {
  name: "Login",
  data() {
    return {
      // 表单信息
      loginForm: {
        // 账户数据
        username: '',
        // 密码数据
        password: '',
        // 验证码数据
        code: '',
        // 验证码的key，因为前后端分离，这里验证码不能由后台存入session，所以交给vue状态管理
        //codeToken: ''
      },
      // 表单验证
      rules: {
        // 设置账户效验规则
        username: [
          {required: true, message: '请输入账户', trigger: 'blur'},
          {min: 8, max: 30, message: '请输入正确的邮箱', trigger: 'blur'}
        ],
        // 设置密码效验规则
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 20, message: '长度在 6 到 20 个字符的密码', trigger: 'blur'}
        ],
        // 设置验证码效验规则
        code: [
          {required: true, message: '请输入验证码', trigger: 'blur'},
          {min: 5, max: 5, message: '长度为 5 个字符', trigger: 'blur'}
        ]
      },
      // 绑定验证码图片
      codeImg: null
    };
  },
  methods: {
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let formdata=new FormData();
          formdata.append("username",this.loginForm.username);
          formdata.append("password",this.loginForm.password);
          formdata.append("code",this.loginForm.code);
          let config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
          // 表单验证成功
          this.$axios.post('http://106.12.172.208/login', formdata,config).then(res => {
            // 拿到结果
            //let result = JSON.parse(res.data.data);
            let message = res.data.msg;
            let codeconfirm=res.data.success;
            let service=res.data.service;
            // 判断结果
            if (message==='true'&&codeconfirm==='true') {
              /*登陆成功*/
              Element.Message.success("登陆成功");

              /*获取用户信息*/
              this.getData(service);

              /*跳转页面*/
/*              while(this.$store.state.astate);
              router.push("/index")*/

            }
            else if(codeconfirm==='false'){
              /*打印错误信息*/
              Element.Message.error("验证码错误");
            }else{
              /*打印错误信息*/
              Element.Message.error("账户或密码错误");
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //转入注册页面
    register(){
      router.push('/register')
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 获取验证码方法
    getVerifyCodeImg() {
      /*获取验证码*/
      let formdata=new FormData();
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      this.$axios.post('http://106.12.172.208/getverifycode',formdata,config).then(res => {
        // 获取验证码key
        //this.loginForm.codeToken = res.data.codeToken;
        // 获取验证码图片
        this.codeImg = res.data.msg;
      })
    },
    getData(service){
      if(!service){
        //store.commit("setastate", {});
        let formdata=new FormData();
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        this.$axios.post('http://106.12.172.208/gethouse', formdata,config).then(res => {
          let msg1 = res.data.msg;
          //alert(JSON.stringify(msg[0]));
          store.commit("setHouseData", {houseList: msg1,that:this});
        })
        /*     while(this.$store.state.astate){
               this.sleep(100);
             }*/

        formdata=new FormData();
        formdata.append("username",this.loginForm.username);

        this.$axios.post('http://106.12.172.208/getuser', formdata,config).then(res =>{
          //alert("发回来了");

          let msg=res.data.msg;
          //alert(msg);
          let username=msg.username;
          let img=msg.img;
          let name=msg.name;
          let userlist=msg.userlist;
          let chatmessagelist=msg.chatmessagelist;
          //alert(userlist[0].username);

          store.commit("setData", {userName:username,img:img,name:name,userList:userlist,chatMessageList:chatmessagelist,that:this});
          store.commit("setWS",{});
        })
        router.push("/index")

      }
      else{
        let formdata=new FormData();
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        this.$axios.post('http://106.12.172.208/gethouse', formdata,config).then(res => {
          let msg1 = res.data.msg;
          //alert(JSON.stringify(msg[0]));
          store.commit("setHouseData", {houseList: msg1,that:this});
          store.commit("setWS",{});
        })
        router.push("/staff");
      }


    },
    sleep(time) {
      var timeStamp = new Date().getTime();
      var endTime = timeStamp + time;
      while (true) {
        if (new Date().getTime() > endTime) {
          return;
        }
      }
    },
  },
  mounted() {
    // 页面渲染完成后执行获取验证码方法
    const CheckId = this.$cookies.get("username");
    if(!CheckId){
      this.getVerifyCodeImg();
    }
    else{
      router.push('/index');
    }

  }
}
</script>


<style scoped>
.codeImg {
  /*让验证码图片飘在右边*/
  float: right;
  /*设置一些圆角边框*/
  border-radius: 3px;
  /*设置宽度*/
  width: 26%;
}

.bg-login {
  height: 100%;
  background-image: url("../assets/background1.JPG");
  background-size: 100%;

}

.btn-ground {
  text-align: center;
}

.logo {
  margin: 30px;
  height: 100px;
  width: 300px;
  position: fixed;
}

.title {
  text-shadow: -3px 3px 1px #5f565e;
  text-align: center;
  margin-top: 30%;
  color: #41b9a6;
  font-size: 35px;
}

.login-card {
  background-color: #ffffff;
  opacity: 0.9;
  box-shadow: 0 0 20px #ffffff;
  border-radius: 10px;
  padding: 40px 40px 30px 15px;
  width: auto;
}
</style>

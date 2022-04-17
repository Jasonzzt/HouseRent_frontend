<template>
  <div :xl="6" :lg="7" class="bg-login">
    <!--logo-->
    <el-image :src="require('@/assets/logo1.png')" class="logo"/>
    <!--标题-->
    <el-row type="flex" class="row-bg row-two" justify="center" align="middle">
      <el-col :span="6"></el-col>
      <el-col :span="6">
        <!--标题-->
        <h1 class="title">住房租赁平台注册</h1>
      </el-col>
      <el-col :span="6"></el-col>
    </el-row>

    <el-row type="flex" class="row-bg card" justify="center" align="bottom">
      <el-col :span="7" class="register-card">
        <!--loginForm-->
        <el-form :model="registerForm" :rules="rules" ref="registerForm" label-width="21%" class="registerForm">
          <el-form-item label="账户" prop="username" style="width: 380px">
            <el-input v-model="registerForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" style="width: 380px">
            <el-input type="password" v-model="registerForm.password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="passwordconf" style="width: 380px">
            <el-input type="password" v-model="registerForm.passwordconf"></el-input>
          </el-form-item>

          <el-form-item class="btn-ground">
            <el-button type="primary" @click="submitForm('registerForm')">立即注册</el-button>
            <el-button @click="returnLogin()">返回登陆</el-button>
            <el-button @click="resetForm('registerForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Element from 'element-ui';
import router from "@/router";
export default {
  name: "Register",
  data() {
    return {
      // 表单信息
      registerForm: {
        // 账户数据
        username: '',
        // 密码数据
        password: '',
        //密码确认数据
        passwordconf:''
      },
      // 表单验证
      rules: {
        // 设置账户效验规则
        username: [
          {required: true, message: '请输入账户', trigger: 'blur'},
          {min: 3, max: 10, message: '长度在 3 到 10 个字符的账户', trigger: 'blur'}
        ],
        // 设置密码效验规则
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 20, message: '长度在 6 到 20 个字符的密码', trigger: 'blur'}
        ],
        passwordconf: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 20, message: '长度在 6 到 20 个字符的密码', trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 表单验证成功
          this.$axios.post('/register', this.registerForm).then(res => {
            // 拿到结果
            let result = JSON.parse(res.data.data);
            let message = res.data.msg;

            // 判断结果
            if (result) {

              /*登陆成功*/
              Element.Message.success(message);
              /*跳转页面*/
              router.push('/home')
            } else {
              /*打印错误信息*/
              Element.Message.error(message);
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    returnLogin(){
      router.push('/');
    }
  }
}
</script>

<style scoped>
.bg-login {
  height: 100%;
  background-image: url("../assets/background1.JPG");
  background-size: 100%;

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
  margin-top: 40%;
  color: #41b9a6;
  font-size: 35px;
}
.register-card{
  background-color: #ffffff;
  opacity: 0.9;
  box-shadow: 0 0 20px #ffffff;
  border-radius: 10px;
  padding: 40px 40px 30px 15px;
  width: auto;
}
</style>
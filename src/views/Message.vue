<template>
  <el-container>
    <el-aside width="400px"><Myaside></Myaside></el-aside>
    <el-container>
      <el-header>用户名</el-header>
      <el-main><Mymain></Mymain></el-main>
      <el-footer><Myfooter></Myfooter></el-footer>
    </el-container>
  </el-container>
</template>

<script>
import Myaside from "@/components/Myaside";
import Myfooter from "@/components/Myfooter";
import Mymain from "@/components/Mymain";

export default {
  components:{
    Myaside,
    Myfooter,
    Mymain
  },
  name: "Message",
}
</script>

<style scoped>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 50px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 40px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
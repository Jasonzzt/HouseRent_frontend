<template>
  <div id="app">
    <el-container>
      <el-header>
        <NaviMenu ></NaviMenu>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>Foot</el-footer>
    </el-container>
  </div>
</template>

<script>
import NaviMenu from "../components/NaviMenu.vue";

export default {
  name: "index",
  components: {
    NaviMenu
  }
};
</script>

<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  height: 100px;
  padding: 0px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 300px;
}

</style>
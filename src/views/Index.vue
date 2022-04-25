<template>
  <div id="app">
    <el-container>
      <el-header>
        <NaviMenu></NaviMenu>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>
        <el-button type="text" @click="dialogVisible = true">免责声明</el-button>
        <br>
        <span>
        © 2022 711201,SEU
        </span>
        <el-dialog
            title="住房租赁平台免责声明"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
          <span>1.平台对于数据的真实性不负责，请用户提高警惕。</span>
          <br>
          <span>2.平台对于交易无任何干涉，请尽量线下交易。</span>
          <br>
          <span>3.平台对于用户信息数据将做到严格保密。</span>
          <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">确认知悉</el-button>
  </span>
        </el-dialog>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import NaviMenu from "../components/NaviMenu.vue";

export default {
  name: "index",
  components: {
    NaviMenu
  },
  data(){
    return {
      dialogVisible: false
    };
  }
};
</script>

<style scoped>
.el-footer {
  background-color: #dbe0e7;
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
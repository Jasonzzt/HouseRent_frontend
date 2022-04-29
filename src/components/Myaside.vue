<template>
  <div style="height: 620px">
    <el-row style="height:60px">
      <div class="myinfo">
        <el-avatar src="http://img.52z.com/upload/news/image/20180111/20180111085521_86389.jpg"></el-avatar>
        <span style="  position: absolute;left: 60px;top: 13px;">在风中飞翔~</span>
      </div>
    </el-row>
    <el-row style="height:50px">
      <el-input v-model="keyword" placeholder="搜索好友">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </el-row>
    <el-row style="height:50px">好友列表</el-row>
    <el-table :data="tableData" stripe style="width: 100%" :show-header='false' >
      <el-table-column  label="日期">
        <template slot-scope="scope">
          <el-avatar :src="scope.row.img"></el-avatar>
          <span class="span" style="text-align: center ">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "Myaside",
  data(){
    return{
      tableData: [{
        name: '王小虎',
        img: 'https://p0.ssl.qhimgs1.com/sdr/400__/t0197ad9742a3e63410.jpg'
      }, {
        name: '郑泷',
        img: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
      }, {
        name: '小蛮',
        img: 'http://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/30adcbef76094b36ba49777aa5cc7cd98c109d49.jpg'
      }, {
        name: '张云',
        img: 'http://img.52z.com/upload/news/image/20180111/20180111085521_86389.jpg'
      },{
        name: '张云',
        img: 'http://img.52z.com/upload/news/image/20180111/20180111085521_86389.jpg'
      },{
        name: '张云',
        img: 'http://img.52z.com/upload/news/image/20180111/20180111085521_86389.jpg'
      },{
        name: '张云',
        img: 'http://img.52z.com/upload/news/image/20180111/20180111085521_86389.jpg'
      },{
        name: '张云',
        img: 'http://img.52z.com/upload/news/image/20180111/20180111085521_86389.jpg'
      }]
    }
  }
}
</script>

<style scoped>
.span{
  position: absolute;
  left: 60px;
  top: 23px;
}
.myinfo{
    text-align: left;
    vertical-align: middle;
    margin-top: 10px;
    margin-left: 10px;
  }
.myinfo span{
  text-align: left;
  vertical-align: middle;
}
</style>
<template>
  <div style="height: 620px">
<!--    <el-row style="height:60px">
      <div class="myinfo">
        <el-avatar src="http://img.52z.com/upload/news/image/20180111/20180111085521_86389.jpg"></el-avatar>
        <span style="  position: absolute;left: 60px;top: 13px;">在风中飞翔~</span>
      </div>
    </el-row>-->

<!--    <el-row style="height:50px">
      <el-input v-model="keyword" placeholder="搜索好友">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </el-row>-->
    <el-row style="height:60px;color: #5e1f83">好友列表</el-row>
    <el-table :data="tableData" stripe style="width: 100%; cursor: pointer;"  :show-header='false' >
      <el-table-column  label="日期" >
        <template slot-scope="scope" >
          <div @click="setUserInfo(scope.row)">
            <el-avatar :src="scope.row.img"></el-avatar>
            <span class="span" style="text-align: center "  >{{ scope.row.name }}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import store from '../store/index';
export default {
  name: "Myaside",
  data(){
    return{

    }
  },

  methods:{
    sleep(time) {
      var timeStamp = new Date().getTime();
      var endTime = timeStamp + time;
      while (true) {
        if (new Date().getTime() > endTime) {
          return;
        }
      }
    },
    setUserInfo(row, column, event){
      //alert(row.name);
      //console.log(row);
      store.commit('setUserInfo',{username:row.username,name:row.name,img:row.img});

    }
  },

  computed:{
    tableData(){
      return  store.state.userList;
    }
  },

}
</script>

<style scoped>
.span{
  position: absolute;
  left: 60px;
  top: 23px;
}

</style>
<template>
  <div>
    <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
      <el-menu-item index="1">现有房源</el-menu-item>
      <el-menu-item index="2">用户投诉</el-menu-item>
    </el-menu>

    <div v-for="(list,index) in housedata" :key="index" v-show="isShow1" >
        <div style="margin-bottom:40px;background-color:#cccccc">
          <img :src="list.img[0]" style="margin-top: 60px;margin-left:20px;border-radius: 8px;width:650px;height:360px"></img>
          <span class="span" style="text-align: center; position:absolute; margin-top: 80px;margin-left: 100px;font-size: 40px;font-family: SimSun;font-weight: bold"  >{{list.district+"   "+list.neighborhood+"   "+list.type}}</span>
          <span class="span1" style="text-align: center; position:absolute; margin-top: 140px;margin-left: 120px;font-size: 20px " >{{list.type}}</span>
          <span v-if="list.joint=='true'" class="span1" style="text-align: center; position:absolute; margin-top: 220px;margin-left: 350px;font-size: 20px " >合租</span>
          <span v-if="list.joint=='false'" class="span1" style="text-align: center; position:absolute; margin-top: 220px;margin-left: 350px;font-size: 20px " >独租</span>
          <span class="span1" style="text-align: center; position:absolute; margin-top: 220px;margin-left: 120px;font-size: 20px "  >{{list.district}}</span>
          <span class="span1" style="text-align: center; position:absolute; margin-top: 140px;margin-left: 350px;font-size: 20px "  >{{list.neighborhood}}</span>
          <span class="span1" style="text-align: center; position:absolute; margin-top: 300px;margin-left: 120px;font-size: 20px "  >{{list.area}}</span>
          <span class="span1" style="text-align: center; position:absolute; margin-top: 300px;margin-left: 350px;font-size: 20px "  >{{list.layer}}</span>
          <span class="span1" style="text-align: center; position:absolute; margin-top: 240px;margin-left: 600px;font-size: 45px;color: #e5121f;font-weight: bold;"  >{{list.cost}}<span style="font-size: 25px;color: #e5121f;font-weight: bold;">元/月</span></span>
<!--
          <span class="span1" style="text-align: center; position:absolute; margin-top: 244px;margin-left: 711px;font-size: 25px;color: #e5121f;font-weight: bold; "  >元/月</span>
-->
        </div>

    </div>

    <div v-for="(qlist,index1) in questions" :key="index1" v-show="isShow2" >
      <div style="background-color: #cccccc;" v-if="qlist.id!=undefined">
        <span style="font-size: 20px ">【用户id】</span>
        <span style="font-size: 20px ">{{qlist.id}}</span>
        <br/>
        <span style="font-size: 20px ">【用户描述】</span>
        <span style="font-size: 20px ">{{qlist.q}}</span>
        <button @click="done(qlist)" style="color: white;border-radius: 50px;background-color: green;position:absolute;right: 50px">已处理</button>
        <hr class="new1">
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import router from "@/router";

export default {
  name: "staff",
  data(){
    return{
      activeIndex: '/staff',
      activeIndex2: '1',

      isShow1:true,
      isShow2:false,
    }
  },
  methods:{
    handleSelect(key, keyPath) {
      if(key==1){
        this.isShow2=false;
        this.isShow1=true;
      }
     if(key==2){
       this.isShow1=false;
       this.isShow2=true;
     }
    },
    done(qlist){
      //alert("被点了！");
      var msg = "确定已处理问题，删除记录吗？\n请确认！";
      if (confirm(msg)==true){
        //alert('去删除');

        store.commit("delQuestion",{id:qlist.id,q:qlist.q});
        return true;
      }else{
        //alert('取消删除');
        return false;
      }
    }
  },
  computed:{
    housedata() {
      return store.state.houseList;
    },
    houseInfo(){
      return store.state.houseInfo;
    },
    questions(){
      return store.state.questions;
    }
  }
}
</script>

<style scoped>
hr.new1 {
  border-top: 1px ;
}

</style>
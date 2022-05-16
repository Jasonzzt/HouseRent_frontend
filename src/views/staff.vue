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
      <el-menu-item index="3">我的消息</el-menu-item>
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
          <el-button @click="del(list)" type="primary" style="position: absolute;right: 50px;margin-top:20px">删除房源</el-button>
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
import Element from "element-ui";
import Myaside from "@/components/Myaside";
import Myfooter from "@/components/Myfooter";
import Mymain from "@/components/Mymain";
import Myheader from "@/components/Myheader";

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
    del(list) {
      //在全局变量userlist里面加入这个人（根据id判断是否已存在）
      //把全局变量的userinfo改成这个人
      if (this.houseInfo.host == this.myInfo.username) {
        if (confirm("确定删除吗")) {
          let formdata = new FormData();
          let config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
          formdata.append("id", this.houseInfo.id);
          this.$axios.post('http://106.12.172.208/deletehouse', formdata, config).then(res => {
            let msg = res.data;
            if (msg == true) {
              Element.Message.success("删除成功");
              let formdata = new FormData();
              let config = {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              }
              this.$axios.post('http://106.12.172.208/gethouse', formdata, config).then(res => {
                let msg = res.data.msg;
                //alert(JSON.stringify(msg[0]));
                store.commit("setHouseData", {houseList: msg});
              })
              router.push('/goingorder');
            } else {
              Element.Message.error("删除失败请重试");
            }
          })
        } else {

        }

      } else {
        store.commit("addUser", {username: list.host});
        router.push('/message');
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
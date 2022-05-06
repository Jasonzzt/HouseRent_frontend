<template>
<body>
      <div v-for="(list,index) in housedata" :key="index">
        <div v-if="list.id==houseInfo.id">
          <div>
            <img :src="list.img[0]" style="margin-top: 60px;margin-left:-800px;border-radius: 8px;width:650px;height:360px"></img>
            <span class="span" style="text-align: center; position:absolute; margin-top: -40px;margin-left: 100px;font-size: 40px;font-family: SimSun;font-weight: bold"  >{{list.district+"   "+list.neighborhood+"   "+list.type}}</span>
            <span class="span1" style="text-align: center; position:absolute; margin-top: 20px;margin-left: 120px;font-size: 20px " >{{list.type}}</span>
              <span v-if="list.joint=='true'" class="span1" style="text-align: center; position:absolute; margin-top: 20px;margin-left: 350px;font-size: 20px " >合租</span>
              <span v-if="list.joint=='false'" class="span1" style="text-align: center; position:absolute; margin-top: 20px;margin-left: 350px;font-size: 20px " >独租</span>
            <span class="span1" style="text-align: center; position:absolute; margin-top: 100px;margin-left: 120px;font-size: 20px "  >{{list.district}}</span>
            <span class="span1" style="text-align: center; position:absolute; margin-top: 100px;margin-left: 350px;font-size: 20px "  >{{list.neighborhood}}</span>
            <span class="span1" style="text-align: center; position:absolute; margin-top: 180px;margin-left: 120px;font-size: 20px "  >{{list.area+"平方米"}}</span>
            <span class="span1" style="text-align: center; position:absolute; margin-top: 180px;margin-left: 350px;font-size: 20px "  >{{list.layer}}</span>
            <span class="span1" style="text-align: center; position:absolute; margin-top: 100px;margin-left: 600px;font-size: 45px;color: #e5121f;font-weight: bold;"  >{{list.cost}}</span>
            <span class="span1" style="text-align: center; position:absolute; margin-top: 104px;margin-left: 711px;font-size: 25px;color: #e5121f;font-weight: bold; "  >元/月</span>
          </div>
          <span style="position: absolute;margin-left: -600px;margin-top: -250px;font-family: SimSun;font-weight: bold;font-size: 30px;color: #41b9a6">房屋详情:{{list.information}}</span>
          <el-button @click="connect(list)" style="position:absolute;bottom:200px;right: 50px" type="primary" >联系房主</el-button>
        </div>


      </div>
      <div>
      </div>
<!--<el-button @click="connect()" style="position:absolute;bottom:200px;right: 50px" type="primary" >联系房主</el-button>-->
</body>


</template>

<script>
import router from "@/router";
import store from "@/store";
export default {
  name: "HouseInfo",

  data(){
    return{
    }
  },

  methods:{
    connect(list){
      //在全局变量userlist里面加入这个人（根据id判断是否已存在）
      //把全局变量的userinfo改成这个人
      store.commit("addUser",{username:list.host});
      router.push('/message');

    }
  },
  computed:{
    housedata(){
      return store.state.houseList;
    },
    houseInfo(){
      return store.state.houseInfo;
}
  }
}



</script>

<style scoped>
.box .left{
  width:40%;
  height:500px;
  background-color:#507D57;
  float:left;
}

.box .right{
  width:60%;
  height:500px;
  background-color:#95B17F;
  float:left;
}

.houseTitle{
  position: absolute;
  margin-top: -100px;
  margin-left: 60px;
}

.button{
  position:absolute;
  margin-top: 450px;
  margin-left:5%;
}
</style>
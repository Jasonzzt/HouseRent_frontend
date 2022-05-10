<template>
<body>
      <div v-for="(list,index) in housedata" :key="index">
        <div v-if="list.id==houseInfo.id">

          <div>
            <div class="block" style="margin-top: 60px;margin-left:-800px;border-radius: 8px;width:650px;height:360px;display: inline-block">
              <el-carousel
                  trigger="click"
                  height="430px"
                  direction="vertical" :autoplay="true"
              >
                <el-carousel-item v-for="item in list.img" :key="item">
                  <img :src="item" style="width: 100%;">
                </el-carousel-item>
              </el-carousel>
            </div>
<!--            <img :src="list.img[0]" style="margin-top: 60px;margin-left:-800px;border-radius: 8px;width:650px;height:360px"></img>-->
            <span class="span" style="text-align: center; position:absolute; margin-top: -40px;margin-left: 100px;font-size: 40px;font-family: SimSun;font-weight: bold"  >{{list.district+"   "+list.neighborhood+"   "+list.type}}</span>
            <span class="span1" style="text-align: center; position:absolute; margin-top: 20px;margin-left: 120px;font-size: 20px " >{{list.type}}</span>
              <span v-if="list.joint=='true'" class="span1" style="text-align: center; position:absolute; margin-top: 20px;margin-left: 350px;font-size: 20px " >合租</span>
              <span v-if="list.joint=='false'" class="span1" style="text-align: center; position:absolute; margin-top: 20px;margin-left: 350px;font-size: 20px " >独租</span>
            <span class="span1" style="text-align: center; position:absolute; margin-top: 100px;margin-left: 120px;font-size: 20px "  >{{list.district}}</span>
            <span class="span1" style="text-align: center; position:absolute; margin-top: 100px;margin-left: 350px;font-size: 20px "  >{{list.neighborhood}}</span>
            <span class="span1" style="text-align: center; position:absolute; margin-top: 180px;margin-left: 120px;font-size: 20px "  >{{list.area}}</span>
            <span class="span1" style="text-align: center; position:absolute; margin-top: 180px;margin-left: 350px;font-size: 20px "  >{{list.layer}}</span>
            <span class="span1" style="text-align: center; position:absolute; margin-top: 100px;margin-left: 600px;font-size: 45px;color: #e5121f;font-weight: bold;"  >{{list.cost}}</span>
            <span class="span1" style="text-align: center; position:absolute; margin-top: 104px;margin-left: 711px;font-size: 25px;color: #e5121f;font-weight: bold; "  >元/月</span>
          </div>
          <el-button @click="mark1(list)" style="position:absolute;bottom:200px;right: 200px" type="primary" >收藏房源</el-button>
            <el-button  @click="del(list)" style="position:absolute;bottom:200px;right: 50px" type="primary" >{{ houseInfo.host==myInfo.username?"删除房源":"联系房主" }}</el-button>
          <span style="position: absolute;margin-left: -600px;margin-top: -250px;font-family: SimSun;font-weight: bold;font-size: 30px;color: #41b9a6">房屋详情:{{list.information}}</span>

        </div>
      </div>
<!--<el-button @click="connect()" style="position:absolute;bottom:200px;right: 50px" type="primary" >联系房主</el-button>-->
</body>


</template>

<script>
import router from "@/router";
import store from "@/store";
import Element from "element-ui";
export default {
  name: "HouseInfo",

  data(){
    return{
      flag:false
    }
  },

  methods:{
    del(list){
      //在全局变量userlist里面加入这个人（根据id判断是否已存在）
      //把全局变量的userinfo改成这个人
      if(this.houseInfo.host==this.myInfo.username)
      {
        //向后端申请删除（houseid）
        let formdata=new FormData();
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        formdata.append("id",this.houseInfo.id);
        this.$axios.post('http://localhost:8080/deletehouse',formdata,config).then(res => {
          let msg=res.data;
          if(msg==true){
            Element.Message.success("删除成功");
            let formdata=new FormData();
            let config = {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
            this.$axios.post('http://localhost:8080/gethouse', formdata,config).then(res => {
              let msg = res.data.msg;
              //alert(JSON.stringify(msg[0]));
              store.commit("setHouseData", {houseList: msg});
            })
            router.push('/goingorder');
          }
          else{
            Element.Message.error("删除失败请重试");
          }
        })
      }
      else{
        store.commit("addUser",{username:list.host});
        router.push('/message');
      }

    },
    mark1(list){
      for (let i=0;i<this.mark.length;i++){
        if(list.id==this.mark[i]) {
          Element.Message.error("请勿重复收藏");
          return;
        }
      }
      store.commit("mark",{id:list.id});

    }
  },
  computed:{
    housedata(){
      return store.state.houseList;
    },
    houseInfo(){
      return store.state.houseInfo;
},
    myInfo(){
      return store.state.myInfo;
    },
    mark(){
      return store.state.myHouseList.marked;
    }
  },
}



</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
/*指示器*/
/deep/ .el-carousel__indicators--horizontal {
  position: absolute;
  left: auto;
  bottom: 0px;
  transform: unset;
  right: 2%;
}

/*指示器按钮*/
/deep/ .el-carousel__button {
  width: 10px;
  height: 10px;
  bottom: 0px;
  border: none;
  margin-bottom: 0px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.2);
}

/*指示器激活按钮*/
/deep/ .is-active .el-carousel__button {
background: #3f8ec8;
}

</style>
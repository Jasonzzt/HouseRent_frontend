<template>
  <div>
    <hr class="hr-solid-content" data-content="我的已发布房屋">
    <el-table :data="housedata"  stripe style="width: 100%; cursor: pointer;border-radius: 25px; " :show-header='false' >
      <el-table-column  label="房子" >
        <template slot-scope="scope" >
          <div @click="moreInfo(scope.row)" >
            <img :src="scope.row.img[0]" style="margin-top: 8px;border-radius: 8px;width:450px;height:260px"></img>
            <span class="span" style="text-align: center; position:absolute; margin-top: 35px;margin-left: 50px;font-size: 30px;font-family: SimSun;font-weight: bold"  >{{scope.row.district+"   "+scope.row.neighborhood+"   "+scope.row.type}}</span>
            <span class="span1" style="text-align: center; position:absolute; margin-top: 120px;margin-left: 120px;font-size: 20px "  >{{scope.row.type}}</span>
            <span v-if="scope.row.joint=='true'" class="span1" style="text-align: center; position:absolute; margin-top: 120px;margin-left: 350px;font-size: 20px " >合租</span>
            <span v-if="scope.row.joint=='false'" class="span1" style="text-align: center; position:absolute; margin-top: 120px;margin-left: 350px;font-size: 20px " >独租</span>
            <span class="span1" style="text-align: center; position:absolute; margin-top: 200px;margin-left: 120px;font-size: 20px "  >{{scope.row.district}}</span>
            <span class="span1" style="text-align: center; position:absolute; margin-top: 200px;margin-left: 350px;font-size: 20px "  >{{scope.row.neighborhood}}</span>
            <span class="span1" style="text-align: center; position:absolute; margin-top: 150px;margin-left: 600px;font-size: 45px;color: #e5121f;font-weight: bold;"  >{{scope.row.cost}}<span style="font-size: 25px;color: #e5121f;font-weight: bold; ">元/月</span></span>
<!--
            <span class="span1" style="text-align: center; position:absolute; margin-top: 154px;margin-left: 711px;font-size: 25px;color: #e5121f;font-weight: bold; "  ></span>
-->
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
import store from "@/store";
import router from "@/router";
import Element from "element-ui";

export default {
  name: "GoingOrder",
  data(){
    return{

    }
  },
  methods:{
    moreInfo(row){
      //alert(row.title);
      store.commit("setHouseInfo",{id:row.id,host:row.host});
      router.push('/houseinfo');
    },
  },
  computed:{
    housedata() {
      let tmp=[];
        for(let j=0;j<store.state.houseList.length;j++){
          if(store.state.myInfo.username==store.state.houseList[j].host){
            tmp.push(store.state.houseList[j]);
          }
      }
      return tmp;
    }
  },
  mounted() {

    const CheckId = this.$cookies.get("username");

    if(!CheckId){
      Element.Message.error("未登录");
      router.push('/')
    }
  }
}
</script>

<style scoped>
.hr-solid-content{
  color: #3f8ec8;
  border: 0;
  font-size: 20px;
  padding: 1em 0;
  position: relative;
}
.hr-solid-content::before {
  content: attr(data-content);
  position: absolute;
  padding: 0 1ch;
  line-height: 1px;
  border: solid #2929b8;
  border-width: 0 99vw;
  width: fit-content;
  /* for IE浏览器 */
  white-space: nowrap;
  left: 50%;
  transform: translateX(-50%);
}
</style>
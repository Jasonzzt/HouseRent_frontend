<template>
  <div>
    <h1>收藏租房</h1>
    <el-table :data="markhouse"  stripe style="width: 100%; cursor: pointer;border-radius: 25px; " :show-header='false' >
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
            <span class="span1" style="text-align: center; position:absolute; margin-top: 150px;margin-left: 600px;font-size: 45px;color: #e5121f;font-weight: bold;"  >{{scope.row.cost}}</span>
            <span class="span1" style="text-align: center; position:absolute; margin-top: 154px;margin-left: 711px;font-size: 25px;color: #e5121f;font-weight: bold; "  >元/月</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
import store from "@/store";
import router from "@/router";

export default {
  name: "MarkedOrder",
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
    markhouse() {
      let tmp=[];
      for(let i=0;i<store.state.myHouseList.marked.length;i++){
        for(let j=0;j<store.state.houseList.length;j++){
          if(store.state.myHouseList.marked[i]==store.state.houseList[j].id){
            tmp.push(store.state.houseList[j]);
          }
        }
      }
      return tmp;
    }
  }
}
</script>

<style scoped>

</style>
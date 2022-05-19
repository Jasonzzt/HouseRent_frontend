<template>
  <div id="app" v-loading="load">
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
        © 2022 SE,711201,SEU
        </span>
        <el-dialog
            title="住房租赁平台免责声明"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
          <span>1.平台对于交易无任何干涉和保障，请尽量线下交易。</span>
          <br>
          <span>2.平台对于数据的真实性不负责，请用户提高警惕。</span>
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
import store from "@/store";
import Element from "element-ui";
import router from "@/router";
export default {
  name: "index",
  components: {
    NaviMenu
  },
  data(){
    return {
      dialogVisible: false,
      load:false
    };
  },
  methods:{
    getData(username){
      let formdata=new FormData();
      formdata.append("username",username);
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      this.$axios.post('http://106.12.172.208/getuser', formdata,config).then(res =>{
        //alert("发回来了");

        let msg=res.data.msg;
        //alert(msg);
        let username=msg.username;
        alert(username+'index')
        let img=msg.img;
        let name=msg.name;
        let userlist=msg.userlist;
        let chatmessagelist=msg.chatmessagelist;
        //alert(userlist[0].username);
        store.commit("setData", {userName:username,img:img,name:name,userList:userlist,chatMessageList:chatmessagelist,that:this});
        store.commit("setWS",{});
      })

    }
  },

  mounted() {

/*    const CheckId = this.$cookies.get("username");

    if(!CheckId){
      Element.Message.error("未登录");
      router.push('/')
    }*/
    //alert("test")
    //alert(this.$store.state.houseList[0].host);
    //this.load=true;
/*    let formdata=new FormData();
    let config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    this.$axios.post('http://106.12.172.208/gethouse', formdata,config).then(res => {
      let msg = res.data.msg;
      alert("house1")
      //alert(JSON.stringify(msg[0]));
      store.commit("setHouseData", {houseList: msg,that:this});
    })*/
    //this.getData(this.$store.state.myInfo.username);
    //while(this.$store.state.astate);
    //this.load=false;
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
<template>
  <el-container>
    <el-aside width="400px"><Myaside></Myaside></el-aside>
    <el-container>
      <el-header><Myheader></Myheader></el-header>
      <el-main><Mymain></Mymain></el-main>
      <el-footer><Myfooter></Myfooter></el-footer>
    </el-container>
  </el-container>
</template>

<script>
import Myaside from "@/components/Myaside";
import Myfooter from "@/components/Myfooter";
import Mymain from "@/components/Mymain";
import Myheader from "@/components/Myheader";
import store from "../store/index";
export default {
  components:{
    Myaside,
    Myfooter,
    Mymain,
    Myheader
  },
  name: "Message",
  data(){
    return{
      //myInfo:
    }
  },
  methods:{
    getData(){
      let formdata=new FormData();
      formdata.append("username",this.$store.state.myInfo.username);
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
        let img=msg.img;
        let name=msg.name;
        let userlist=msg.userlist;
        let chatmessagelist=msg.chatmessagelist;
        //alert(userlist[0].username);
        store.commit("setData", {userName:username,img:img,name:name,userList:userlist,chatMessageList:chatmessagelist});
        store.commit("setWS",{});
      })
    }
  },
  mounted() {
  }
  /*  computed: {
      ...mapState(["myInfo"])
    }*/

}
</script>

<style scoped>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 50px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 40px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
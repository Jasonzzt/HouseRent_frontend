<template>
<body>
<div class="box">
  <div class="left">
    <img style="width: 100%;height: 100%" src="https://pic4.ajkimg.com/display/xinfang/0bfa693ea00ccc2a9af9d607359ec58f/245x160m.jpg">
  </div>
  <div class="right">
    <h1 class="title">明星小区</h1>
    <span style="font-size:30px">6000元/平方米</span>
    <span style="margin-left: 50px">三室一厅</span>
    <span style="margin-left: 50px">合租</span>
    <el-button class="button" >联系卖家</el-button>
  </div>
</div>
</body>


</template>

<script>
export default {
  name: "HouseInfo",

  data(){
    return{
      //表单信息
      HouseInfo:{
        houseId:'',
        neighborhood:'',
        type:'',
        area:'',
        cost:'',
        layer:'',
        joint:'',
        information:'',
        host:''
      }
    }
  },

  methods:{

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

.title{
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
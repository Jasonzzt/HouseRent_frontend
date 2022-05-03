<template>
 <div>
   <body onload="opener.location.reload()">
   <h1 id="title">信息组合</h1>
    <div>
     <img class="showImg" src=https://pic4.ajkimg.com/display/xinfang/7d41f5ace3acbe226234aa1f81aa1155/403x335n.jpg>
    </div>
      <div>详细介绍</div>
   </body>
 </div>

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

</style>
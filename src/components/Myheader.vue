<template>
  <h>{{userInfo.name}}</h>
</template>

<script>
import store from '../store/index';
export default {

  name: "Myheader",
  data:{
    return(){

    }
  },
  computed: {
    userInfo() {
        return store.state.userInfo;
      },
    ws(){
      return store.state.ws;
    }
  },

}
</script>

<style scoped>

</style>
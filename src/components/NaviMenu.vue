<template>
  <div id="NavMenu">
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
    >

      <template v-for="item in navMenuData">
        <el-menu-item :index="item.index" v-if="!item.child">{{item.name}}</el-menu-item>

        <el-submenu :index="item.index" v-if="item.child">
          <template slot="title">{{item.name}}</template>
          <template v-for="item2 in item.child">
            <el-menu-item :index="item2.index">{{item2.name}}</el-menu-item>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>

</template>

<script>
export default {
  name: "NaviMenu",
  data() {
    return {
      activeIndex: "housedata",
      navMenuData: [
        { index: "housedata", name: "住房信息" },
        { index: "message", name: "我的消息" },
        {
          index: "2",
          name: "租房记录",
          child: [{ index: "2-1", name: "合同期内租房" },{ index: "2-2", name: "已完成租赁" },{ index: "2-3", name: "已收藏租赁住房" }]
        },

      ]
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      //console.log(key, keyPath);
    }
  },
  mounted(){
    //console.log(this.activeIndex)
    //console.log(this.$route.path)
    this.activeIndex = this.$route.path.substring(1,this.$route.path.length);

  }
};
</script>

<style scoped>
</style>
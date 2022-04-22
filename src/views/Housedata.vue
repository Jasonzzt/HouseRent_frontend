<template>
  <div>
    <div class="block">
      <template>
        <el-carousel :interval="4000" type="card" height="400px" indicator-position="none">
          <el-carousel-item v-for="item in 4" :key="item">
            <h3>{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </template>
    </div>



    <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">
      信息选择
    </el-button>

    <el-drawer
        title=""
        :visible.sync="drawer"
        direction="ltr"
        custom-class="demo-drawer"
        ref="drawer"
    >
      <div name = "location" id="location" style="position:absolute;left:40px;top:50px">
      <span>地区 &emsp;</span>
      <el-select v-model="value1" multiple popper-append-to-body="false" filterable placeholder="请选择">
        <el-option
            v-for="item in locationOptions"
            :key="item.value1"
            :label="item.label"
            :value="item.value1">
        </el-option>
      </el-select>
      </div>

      <div name = "type" id="type" style="position:absolute;left:40px;top:150px">
      <span>户型 &emsp;</span>
      <el-select v-model="value2" multiple popper-append-to-body="false" filterable placeholder="请选择">
        <el-option
            v-for="item in typeOptions"
            :key="item.value2"
            :label="item.label"
            :value="item.value2">
        </el-option>
      </el-select>
      </div>

      <div name = "cost" id="cost" style="position:absolute;left:40px;top:250px">
        <span>租金 &emsp;</span>
        <el-select v-model="value3" multiple  popper-append-to-body="false" filterable placeholder="请选择">
          <el-option
              v-for="item in costOptions"
              :key="item.value3"
              :label="item.label"
              :value="item.value3">
          </el-option>
        </el-select>
      </div>
    </el-drawer>

  </div>
</template>


<script>
export default {
  name: "Housedata",

  data() {
    return {
      //选择器
      locationOptions: [{
        value1: '选项1',
        label: '不限'
      }, {
        value1: '选项2',
        label: '江宁区'
      }, {
        value1: '选项3',
        label: '栖霞区'
      }, {
        value1: '选项4',
        label: '鼓楼'
      }, {
        value1: '选项5',
        label: '秦淮'
      }],

      typeOptions: [{
        value2: '选项1',
        label: '不限'
      }, {
        value2: '选项2',
        label: '一室'
      }, {
        value2: '选项3',
        label: '两室'
      }, {
        value2: '选项4',
        label: '三室'
      }, {
        value2: '选项5',
        label: '三室以上'
      }],

      costOptions: [{
        value3: '选项1',
        label: '不限'
      }, {
        value3: '选项2',
        label: '1500元以下'
      }, {
        value3: '选项3',
        label: '1500-3000元'
      }, {
        value3: '选项4',
        label: '3000-4500元'
      }, {
        value3: '选项5',
        label: '4500-6000元'
      }, {
        value3:'选项6',
        label: '6000元以上'
      }],
      value1: '',
      value2: '',
      value3: '',

      //抽屉效果
      drawer: false,
      direction: 'ttb',

    };
  },
  methods: {

    cancelForm() {
      this.loading = false;
      this.dialog = false;
      clearTimeout(this.timer);
    }
  }
}


</script>

<style>
.popper-dropdown {
  min-width: 120px;
  position: absolute !important;
  top: 35px !important;
  left: -45px !important;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 54px;
  opacity: 0.75;
  line-height: 450px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}


</style>
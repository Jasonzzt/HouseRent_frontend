<template>
  <div>
   <!--    走马灯-->
    <div class="block">
        <el-carousel :interval="2000" type="card" height="400px" indicator-position="none">
          <el-carousel-item v-for="item in 4" :key="item">
            <h3>{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
    </div>

    <el-input v-model="input" ref="neighborhood" size="medium" placeholder="请输入小区名" style="width:300px" ></el-input>
    <el-button  @click="research()" type="primary" style="margin-left: 16px;">搜索</el-button>
    <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">
      信息选择
    </el-button>
    <el-button type="primary" @click="release()">发布房源</el-button>

    <!--抽屉效果-->
    <el-drawer
        title=""
        :visible.sync="drawer"
        :before-close="handleClose"
        direction="ltr"
        custom-class="demo-drawer"
        ref="drawer"
    >
   <!--  三个选择器-->
    <div class="selectBlock">
      <span>地区 &emsp;</span>
      <el-select  v-model="value1" multiple popper-append-to-body="false" filterable placeholder="请选择">
        <el-option
            v-for="item in locationOptions"
            :key="item.value1"
            :label="item.label"
            :value="item.value1">
        </el-option>
      </el-select>
  </div>

  <div class="selectBlock">
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

     <div class="selectBlock">
        <span>租金 &emsp;</span>
        <el-select  v-model="value3" multiple  popper-append-to-body="false"  filterable placeholder="请选择">
          <el-option
              v-for="item in costOptions"
              :key="item.value3"
              :label="item.label"
              :value="item.value3">
          </el-option>
        </el-select>
     </div>
<!--      <el-button @click="cancelForm">取 消</el-button>-->
      <el-button style="position:absolute;bottom:50px;z-index: 10" type="primary" @click="$refs.drawer.closeDrawer()" >确定</el-button>
    </el-drawer>

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
            <span class="span1" style="text-align: center; position:absolute; margin-top: 150px;margin-left: 600px;font-size: 45px;color: #e5121f;font-weight: bold;"  >{{scope.row.cost}}</span>
            <span class="span1" style="text-align: center; position:absolute; margin-top: 154px;margin-left: 711px;font-size: 25px;color: #e5121f;font-weight: bold; "  >元/月</span>
          </div>
        </template>

      </el-table-column>
    </el-table>

  </div>
</template>


<script>
import router from "@/router";
import store from "../store/index";
export default {
  name: "Housedata",

  data() {
    return {
      //搜索栏输入器
      input: '',
      //抽屉内三个的选择器
      locationOptions: [{
        value1: '不限',
        label: '不限'
      }, {
        value1: '江宁区',
        label: '江宁区'
      }, {
        value1: '栖霞区',
        label: '栖霞区'
      }, {
        value1: '鼓楼区',
        label: '鼓楼区'
      }, {
        value1: '秦淮区',
        label: '秦淮区'
      },{
        value1:'雨花台区',
        label:'雨花台区'
      },
        {
          value1:'玄武区',
          label: '玄武区'
        },
        {
          value1:'建邺区',
          label: '建邺区'
        },
        {
           value1: '六合区',
          label: '六合区'

        },
        {
          value1: '高淳区',
          label: '高淳区'
        },
        {
          value1: '江北新区',
          label: '江北新区'
        },
        {
          value1: '溧水区',
          label: '溧水区'
        }],

      typeOptions: [{
        value2: '不限',
        label: '不限'
      }, {
        value2: '一室',
        label: '一室'
      }, {
        value2: '两室',
        label: '两室'
      }, {
        value2: '三室',
        label: '三室'
      }, {
        value2: '三室以上',
        label: '三室以上'
      }],

      costOptions: [{
        value3: '不限',
        label: '不限'
      }, {
        value3: '1500元以下',
        label: '1500元以下'
      }, {
        value3: '1500-3000元',
        label: '1500-3000元'
      }, {
        value3: '3000-4500元',
        label: '3000-4500元'
      }, {
        value3: '4500-6000元',
        label: '4500-6000元'
      }, {
        value3:'6000元以上',
        label: '6000元以上'
      }],
      value1: '',
      value2: '',
      value3: '',

      //抽屉效果
      drawer: false,

      direction: 'ttb',
      housedata:this.$store.state.houseList

    };
  },
  methods: {
    //跳转详情界面
    moreInfo(row){
      //alert(row.title);
      store.commit("setHouseInfo",{id:row.id,host:row.host});
      router.push('/houseinfo');
    },
    //发布房源
    release(){
      router.push('/houserelease');
    },
    //搜索框，向后端传入输入的小区名，根据小区名显示房源列表
    research(){
     // alert(this.input);
      store.commit("researchHouse",{neighborhood:this.input});
      this.$data.housedata=this.$store.state.chosenList;
    },
    //抽屉关闭时
    handleClose(done) {
      //alert("抽屉关闭");
      done();
      //value1\2\3中的值为当前选中值所组成的数组
      //alert("?")
      //alert(this.value1[0])
      store.commit("selectHouse",{district:this.value1,type:this.value2,cost:this.value3});
      this.$data.housedata=this.$store.state.chosenList;
    },
    cancelForm(){
      this.drawer = false;
    }

    },
  computed:{
    housedata() {
      return store.state.houseList;
    }
  }
}


</script>
<style>

.el-carousel__item h3 {
  color: #475669;
  font-size: 54px;
  opacity: 0.75;
  line-height: 450px;
  margin: 0;
}

.el-select-dropdown {
  top: 150px !important;
  left: 150px !important;
}

.selectBlock{
  height: 120px;

}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
/*房源展示列表的格式*/
.showWindow{
  width: 1200px;
  height: 300px;
  /*margin-left: 15px ;!*左边距*!*/
  margin-bottom: 40px ;
  background-color: #99A9BF;
}
/*房源展示列表中的图片*/
.showImg{
  width: 40%;
  height: 100%;
  display: inline-block;
  /*margin-left: 15px;*/
  margin-top: 15px;
  float: left;
}
/*房源展示列表中的标题*/
.showTitle{
  width: 10%;
  height: 50px;

  margin-left: 40px;
  display: inline-block;
  float: left;
}

.showTag{
  /*height: 10%;*/
  /*width: 60%;*/
  display: inline-block;
  float: left;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 60px;

}

.el-main {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 160px;

}
.titles{
  position: absolute;
  margin-top: 10px;
  margin-left: 30px;

}
.otherthing{
  position: absolute;
  margin-top: 50px;
  margin-left: 30px;
}
.housedata{
  border: #eceeee solid 2px;
}
</style>
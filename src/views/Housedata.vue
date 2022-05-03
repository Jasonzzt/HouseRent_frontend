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

    <el-input v-if="isReloadData" v-model="input" ref="neighborhood" size="medium" placeholder="请输入小区名" style="width:300px" ></el-input>
    <el-button  @click="research()" type="primary" style="margin-left: 16px;">搜索</el-button>
    <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">
      信息选择
    </el-button>
    <el-button @click="moreInfo()" type="primary" >详情界面</el-button>
    <!--抽屉效果-->
    <el-drawer
        title=""
        :visible.sync="drawer"
        direction="ltr"
        custom-class="demo-drawer"
        ref="drawer"
    >
   <!--  三个选择器-->
    <div >
      <span>地区 &emsp;</span>
      <el-select @change="changeValue(value1,value2,value3)" v-model="value1" multiple popper-append-to-body filterable placeholder="请选择">
        <el-option
            v-for="item in locationOptions"
            :key="item.value1"
            :label="item.label"
            :value="item.value1">
        </el-option>
      </el-select>
  </div>

  <div>
      <span>户型 &emsp;</span>
      <el-select @change="changeValue(value1,value2,value3)" v-model="value2" multiple popper-append-to-body filterable placeholder="请选择">
        <el-option
            v-for="item in typeOptions"
            :key="item.value2"
            :label="item.label"
            :value="item.value2">
        </el-option>
      </el-select>
  </div>

     <div>
        <span>租金 &emsp;</span>
        <el-select @change="changeValue(value1,value2,value3)" v-model="value3" multiple  popper-append-to-body  filterable placeholder="请选择">
          <el-option
              v-for="item in costOptions"
              :key="item.value3"
              :label="item.label"
              :value="item.value3">
          </el-option>
        </el-select>
     </div>
    </el-drawer>
    <div class="housedata" v-for="house in housedata" :key="index" style="cursor: pointer" @click="moreInfo">
      <el-container>
        <el-aside  width="520px" ><img :src="house.img" style="margin-top: 20px;border-radius: 8px; width:450px;height:260px"></el-aside>
        <el-main >
          <h1 class="title" style="font-size: 30px">{{house.title}}</h1>
          <p class="otherthing" style="font-size: 20px">{{house.otherthing}}</p>
        </el-main>
      </el-container>
    </div>

  </div>
</template>


<script>
import router from "@/router";

export default {
  name: "Housedata",

  data() {
    return {
      //局部刷新标识
      isReloadData:true,
      //搜索栏输入器
      input: '',
      //抽屉内三个的选择器
      locationOptions: [{
        value1: 'loc1',
        label: '不限'
      }, {
        value1: 'loc2',
        label: '江宁区'
      }, {
        value1: 'loc3',
        label: '栖霞区'
      }, {
        value1: 'loc4',
        label: '鼓楼'
      }, {
        value1: 'loc5',
        label: '秦淮'
      }],

      typeOptions: [{
        value2: 'ty1',
        label: '不限'
      }, {
        value2: 'ty2',
        label: '一室'
      }, {
        value2: 'ty3',
        label: '两室'
      }, {
        value2: 'ty4',
        label: '三室'
      }, {
        value2: 'ty5',
        label: '三室以上'
      }],

      costOptions: [{
        value3: 'c1',
        label: '不限'
      }, {
        value3: 'c2',
        label: '1500元以下'
      }, {
        value3: 'c3',
        label: '1500-3000元'
      }, {
        value3: 'c4',
        label: '3000-4500元'
      }, {
        value3: 'c5',
        label: '4500-6000元'
      }, {
        value3:'c6',
        label: '6000元以上'
      }],
      value1: '',
      value2: '',
      value3: '',

      //抽屉效果
      drawer: false,
      direction: 'ttb',
      housedata:[
        {
          title:"小区一",
          img:"https://pic4.ajkimg.com/display/xinfang/b57d6d4baf27754c01996e42cda8fece/403x335n.jpg",
          otherthing:"很不戳"
        },
        {
          title:"小区二",
          img:"https://pic4.ajkimg.com/display/xinfang/778cedb340da07b23d26cbf381201ccc/403x335n.jpg",
          otherthing:"挺好"
        }
      ]

    };
  },
  methods: {
    //刷新当前界面
    reloadPart(){
      this.isReloadData=false;
      this.$nextTick(()=> {
        this.isReloadData = true
      })
      },
    //跳转详情界面
    moreInfo(){

      router.push('/houseinfo')
    },
    //搜索框，向后端传入输入的小区名，根据小区名显示房源列表
    research(){
      this.$axios.post("http://localhost:8080/getverifycode",this.$refs.neighborhood).then(res=>{

        this.$router.push('/houseinfo')
      });
    },
    changeValue(v1,v2,v3){

    }
    },

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
.title{
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
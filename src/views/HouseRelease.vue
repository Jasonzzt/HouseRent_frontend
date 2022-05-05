<template>
  <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
    <el-form-item label="小区名称">
      <el-input v-model="houseForm.neighborhood"></el-input>
    </el-form-item>
    <el-form-item label="房产地区">
      <el-select v-model="houseForm.district" placeholder="请选择房产地区" style="margin-left: -1210px">
        <el-option label="建邺区" value="建邺区"></el-option>
        <el-option label="江宁区" value="江宁区"></el-option>
        <el-option label="鼓楼区" value="鼓楼区"></el-option>
        <el-option label="玄武区" value="玄武区"></el-option>
        <el-option label="六合区" value="六合区"></el-option>
        <el-option label="高淳区" value="高淳区"></el-option>
        <el-option label="雨花台区" value="雨花台区"></el-option>
        <el-option label="溧水区" value="溧水区"></el-option>
        <el-option label="江北新区" value="江北新区"></el-option>
        <el-option label="栖霞区" value="栖霞区"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="房产户型">
      <el-select v-model="houseForm.type" placeholder="请选择房产户型" style="margin-left: -1210px">
        <el-option label="一室" value="一室"></el-option>
        <el-option label="两室" value="两室"></el-option>
        <el-option label="三室" value="三室"></el-option>
        <el-option label="三室以上" value="三室以上"></el-option>
      </el-select>
    </el-form-item>

<!--    <el-form-item label="活动时间">
      <el-col :span="11">
        <el-date-picker type="date" placeholder="选择日期" v-model="houseForm.date1" style="width: 100%;"></el-date-picker>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-time-picker placeholder="选择时间" v-model="sizeForm.date2" style="width: 100%;"></el-time-picker>
      </el-col>
    </el-form-item>-->
<!--    <el-form-item label="合租属性">
      <el-checkbox-group v-model="houseForm.type">
        <el-checkbox-button label="美食/餐厅线上活动" name="type"></el-checkbox-button>
        <el-checkbox-button label="地推活动" name="type"></el-checkbox-button>
        <el-checkbox-button label="线下主题活动" name="type"></el-checkbox-button>
      </el-checkbox-group>
    </el-form-item>-->
    <el-form-item label="合租属性" >
      <el-radio-group v-model="houseForm.joint" size="medium" style="margin-left: -1260px">
        <el-radio label="合租" value="true"></el-radio>
        <el-radio label="独租" value="false"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="房产面积">
      <el-input v-model="houseForm.area" placeholder="单位为平方米(仅填数字)"></el-input>
    </el-form-item>
    <el-form-item label="房产楼层">
      <el-input v-model="houseForm.layer" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="租金">
      <el-input v-model="houseForm.cost" placeholder="单位元(仅填数字)"></el-input>
    </el-form-item>
    <el-form-item label="房产详情">
      <el-input v-model="houseForm.information" placeholder=""></el-input>
    </el-form-item>
    <el-upload
        name="file"
        class="upload-demo"
        ref="upload"
        action="http://localhost:8080/uploadimage"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :auto-upload="false" style="margin-top: -120px">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
<!--      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>-->
    </el-upload>
    <el-form-item size="large" style="margin-left: -15px;margin-top: -70px">
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "HouseRelease",

  data() {
    return {
      houseForm: {
        neighborhood: '',
        district: '',
        delivery: false,
        type: '',
        layer: ''+"层",
        information: '',
        joint:'',
        area:'',
        host:'',
        cost:''
      },
      fileList: []
    };
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },

    submitUpload() {

      this.$refs.upload.submit()

    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
  }

}
</script>

<style scoped>

</style>
<template>
  <el-form ref="form" :model="sizeForm" label-width="80px" size="">
    <el-form-item label="小区名称" style="font-weight: bold">
      <el-input v-model="houseForm.neighborhood"></el-input>
    </el-form-item>
    <el-form-item label="房产地区" style="font-weight: bold;">
      <el-select v-model="houseForm.district" placeholder="请选择房产地区" style="margin-left: -1180px">
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
    <el-form-item label="房产户型" style="font-weight: bold">
      <el-select v-model="houseForm.type" placeholder="请选择房产户型" style="margin-left: -1180px">
        <el-option label="一室" value="一室"></el-option>
        <el-option label="两室" value="两室"></el-option>
        <el-option label="三室" value="三室"></el-option>
        <el-option label="三室以上" value="三室以上"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="合租属性" style="font-weight: bold">
      <el-radio-group v-model="houseForm.joint" size="medium" style="margin-left: -1260px">
        <el-radio label="合租" value="true" ></el-radio>
        <el-radio label="独租" value="false"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="房产面积" style="font-weight: bold">
      <el-input v-model="houseForm.area" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="房产楼层" style="font-weight: bold">
      <el-input v-model="houseForm.layer" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="租金" style="font-weight: bold">
      <el-input v-model="houseForm.cost" placeholder="元/月"></el-input>
    </el-form-item>
    <el-form-item label="房产详情" style="font-weight: bold">
      <el-input v-model="houseForm.information" placeholder=""></el-input>
    </el-form-item>
    <div style="height: 320px">
      <el-upload
          :data="houseForm"
          name="file"
          class="upload-demo"
          ref="upload"
          action="http://localhost:8080/uploadimage"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :auto-upload="false" style="margin-top: -140px;">
        <el-button slot="trigger" size="large" type="primary" style="margin-left: -65px">上传图片</el-button>
        <!--      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>-->
        <el-button type="success" @click="onSubmit"  style="margin-left: 40px">立即发布</el-button>
      </el-upload>
    </div>
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
        area:''+"平方米",
        host:'',
        cost:''+""
      },
      fileList: [],
    };
  },
  methods: {
    onSubmit() {
      alert("submit");
      this.submitUpload();
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
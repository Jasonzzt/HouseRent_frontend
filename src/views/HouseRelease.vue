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
          :on-success="onSuccess"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          multiple
          :auto-upload="false" style="margin-top: -140px;">
        <el-button slot="trigger" size="large" type="primary" style="margin-left: -65px">上传图片</el-button>
        <!--      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>-->
        <el-button type="success" @click="submitUpload"  style="margin-left: 40px">立即发布</el-button>
      </el-upload>
    </div>
  </el-form>
</template>

<script>
import store from "@/store";
import Element from "element-ui";
export default {
  name: "HouseRelease",

  data() {
    return {
      houseForm: {
        neighborhood: '',
        district: '',
        //delivery: false,
        type: '',
        layer: ''+"层",
        information: '',
        joint:'',
        area:''+"㎡",
        host:this.$store.state.myInfo.username,
        cost:''
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
      let { uploadFiles } = this.$refs.upload
      let form = new FormData()
      form.append("neighborhood",this.houseForm.neighborhood);
      form.append("district",this.houseForm.district);
      form.append("type",this.houseForm.type);
      form.append("layer",this.houseForm.layer);
      form.append("information",this.houseForm.information);
      form.append("joint",this.houseForm.joint);
      form.append("area",this.houseForm.area);
      form.append("host",this.houseForm.host);
      form.append("cost",this.houseForm.cost);
      let status = true
      // 在这里对每一张图片进行大小的校验，如果不符合则提示，所有不符合的都提示，校验完成后只要有不符合条件的就不执行下面的操作
      uploadFiles.forEach(item => {
        const size = item.raw.size / 1024 <= 500
        if (!size) {
          this.$message.error(`${item.raw.name}大小超过500KB`)
          status = false
          return
        }
        form.append('image[]', item.raw)
      })
      if (!status) {
        return
      }
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      this.$axios.post("http://localhost:8080/uploadimage",form, config).then(res=>{
        let msg=res.data;
        if(msg==true) {
          Element.Message.success("上传成功");
          let config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
          this.$axios.post('http://localhost:8080/gethouse', new FormData(), config).then(res => {
            let msg = res.data.msg;
            //alert(JSON.stringify(msg[0]));
            store.commit("setHouseData", {houseList: msg});
          })
        }
      })
      // 符合条件后再将这个FormData对象传递给后端
      //调取接口上传form参数
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    onSuccess(res){

    }
  }

}
</script>

<style scoped>

</style>
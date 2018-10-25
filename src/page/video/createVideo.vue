<template>
  <div v-loading="loading">
    
    <router-link to="/home/video"><i class="el-icon-arrow-left"></i>宣传视频</router-link>
    <div class="form-box">

    <el-form ref="ruleForm" :rules="rules" :model="form" label-width="80px">
      <el-form-item prop="videoName"  label="视频名称">
        <el-input v-model="form.videoName" required auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item prop="sort" label="序号">
        <el-input v-model="form.sort" type="number" required auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item prop="imagesfile" label="选择图片">
        <input type="file" required auto-complete="off" @change="imagesChange"/>
      </el-form-item>
      <el-form-item prop="imagesfile" label="选择视频">
        <input type="file" required auto-complete="off" @change="videoChange"/>
      </el-form-item>
      <el-form-item label-width="0" class="form-btn">
          <el-button type="primary" @click="onSubmit">确定</el-button>
          <el-button type="primary" @click="cancle">取消</el-button>
      </el-form-item>
    </el-form>
    </div>
  </div>
</template>
<script>
import api from "@/api/api";
import config from "@/config/config.js";
export default {
  data() {
    return {
      form: {
        videoName: "",
        sort: ""
      },
      loading: false,
      files: [],
      rules: {
        videoName: [{ required: true, message: "必填项", trigger: "change" }],
        sort: [{ required: true, message: "必填项", trigger: "change" }]
      }
    };
  },
  created() {},
  watch: {},
  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid && this.files[0] && this.files[1]) {
          let formData = new FormData();
          formData.append("videoName", this.form.videoName);
          formData.append("sort", this.form.sort);
          formData.append("file", this.files[0]);
          formData.append("file", this.files[1]);
          this.loading = true;
          api
            .postFile(config.baseUrl + "/sm/adVideo/add", formData)
            .then(res => {
              if (res.data.status == 0) {
                this.$message({
                  type: "success",
                  message: "新增成功!"
                });
                this.loading = false;
                this.$router.push("/home/video");
              }
            });
        } else {
          if (!this.files[0] || !this.files[1]) {
            this.$message({
              type: "warning",
              message: "请先选择文件!"
            });
          }
          return false;
        }
      });
    },
    imagesChange(e) {
      this.files[0] = e.target.files[0];
    },
    videoChange(e) {
      this.files[1] = e.target.files[0];
    },
    cancle() {
      this.$router.push("/home/video");
    }
  }
};
</script>

<style lang="scss" scoped>

</style>

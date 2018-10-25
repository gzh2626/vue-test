<template>
  <div v-loading="loading" class="detail-concent">
    
    <router-link to="/home/classify"><i class="el-icon-arrow-left"></i>分类</router-link>
    <div class="form-box">

    <el-form ref="ruleForm" :rules="rules" :model="form" label-width="80px">
      <el-form-item prop="cateName"  label="分类名称">
        <el-input v-model="form.cateName" required auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item prop="sort" label="序号">
        <el-input v-model="form.sort" type="number" required auto-complete="off"></el-input>
      </el-form-item>
     <el-upload
      ref="upload"
      :action="action"
      :data="form"
      :on-success="onSuccess"
      list-type="picture"
      :auto-upload="false">
      <el-button slot="trigger" size="small" type="primary">选取图片</el-button>
    </el-upload>
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
      action: config.baseUrl + "/sm/cate/add",
      form: {
        cateName: "",
        sort: ""
      },
      loading: false,
      files: [],
      rules: {
        cateName: [{ required: true, message: "必填项", trigger: "change" }],
        sort: [{ required: true, message: "必填项", trigger: "change" }]
      }
    };
  },
  created() {},
  watch: {},
  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid && this.$refs.upload.uploadFiles.length > 0) {
          this.$refs.upload.submit();
        } else {
          if (this.$refs.upload.uploadFiles.length == 0) {
            this.$message({
              type: "warning ",
              message: "请先选择图片!"
            });
            return false;
          }
          return false;
        }
      });
    },
    onSuccess(response) {
      if (response.status == 0) {
        this.$router.push("/home/classify");
      }
    },
    cancle() {
      this.$router.push("/home/classify");
    }
  }
};
</script>

<style lang="scss" scoped>

</style>

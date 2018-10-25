<template>
  <div>
    
    <router-link to="/home/course"><i class="el-icon-arrow-left"></i>课程管理</router-link>
    <div class="form-box">

    <el-form ref="ruleForm" :rules="rules" :model="form" label-width="80px">
      <el-form-item prop="courseName"  label="课程名称">
        <el-input v-model="form.courseName" required auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="活动区域" prop="region">
          <el-select
            v-model="form.cateId"
            filterable
            default-first-option>
            <el-option
              v-for="item in cateList"
              :key="item.cateName"
              :label="item.cateName"
              :value="item.cateId">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" v-model="form.courseDesc"></el-input>
      </el-form-item>
      <el-form-item label="图片" class="upload-group">
        <el-upload
          ref="upload"
          :action="action"
          :data="form"
          :on-success="onSuccess"
          :file-list='file'
          list-type="picture"
          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        </el-upload>
      </el-form-item>
        <quill-editor
        ref="editor"
        style="height: 400px; margin-bottom: 87px"
        :options="newOption"
        v-model="form.courseDetail">
      </quill-editor>

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
import { quillEditor } from "vue-quill-editor";
import Quill from "quill";

export default {
  data() {
    return {
      form: {
        courseName: "",
        courseDesc: "",
        cateId: "",
        courseDetail: "",
        courseId: this.$route.params.id
      },
      file: [],
      action: config.baseUrl + "/sm/course/update",
      cateList: [],
      rules: {
        courseName: [{ required: true, message: "必填项", trigger: "change" }]
      },
      newOption: {
        placeholder: "请填写",
        history: {
          delay: 100,
          maxStack: 100,
          userOnly: false
        },
        modules: {
          toolbar: [
            [{ size: ["small", "large", "huge"] }],
            ["bold", "italic", "underline"],
            ["blockquote"],
            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            [{ font: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"]
          ]
        },
        strict: false //should be false for ignore unexpected update
      }
    };
  },
  created() {
    this.getDatil();
  },
  watch: {},
  methods: {
    getCateList() {
      let self = this;
      api.get(config.baseUrl + "/sm/cate/list").then(res => {
        if (res.data.status == 0) {
          self.cateList = res.data.data;
        }
      });
    },
    getDatil() {
      let self = this;
      let id = this.$route.params.id;
      api.get(config.baseUrl + "/sm/course/findOne/" + id).then(res => {
        if (res.data.status == 0) {
          self.form.courseName = res.data.data.courseName;
          self.form.courseDesc = res.data.data.courseDesc;
          self.form.courseDetail = res.data.data.courseDetail;
          self.form.cateId = res.data.data.cateId;
          self.getCateList();
        }
      });
    },
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (
          valid &&
          this.form.cateId &&
          this.form.courseDetail &&
          this.$refs.upload.uploadFiles.length > 0
        ) {
          this.$refs.upload.submit();
        } else {
          if (!this.form.courseDetail) {
            this.$message({
              type: "warning ",
              message: "富文本不得为空!"
            });
            return false;
          }
          if (this.$refs.upload.uploadFiles.length == 0) {
            this.$message({
              type: "warning ",
              message: "请先选择图片!"
            });
            return false;
          }
          if (!this.form.cateId) {
            this.$message({
              type: "warning ",
              message: "没有分类!"
            });
          }
          return false;
        }
      });
    },
    cancle() {
      this.$router.push("/home/course");
    },
    onSuccess(response) {
      if (response.status == 0) {
        this.$message({
          type: "success",
          message: "编辑成功!"
        });
        this.$router.push("/home/course");
      }
    }
  }
};
</script>

<style lang="scss" scoped>

</style>

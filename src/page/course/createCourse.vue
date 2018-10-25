<template>
  <div v-loading="loading">
    
    <router-link to="/home/course"><i class="el-icon-arrow-left"></i>课程管理</router-link>
    <div class="form-box">

    <el-form ref="ruleForm" :rules="rules" :model="form" label-width="80px">
      <el-form-item prop="courseName"  label="课程名称">
        <el-input v-model="form.courseName" required auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="活动区域" prop="region">
          <el-select
            v-model="cateId"
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
      <el-form-item label="选择图片">
        <input type="file" required auto-complete="off" @change="imagesChange"/>
      </el-form-item>
      <el-form-item label="选择视频">
        <input type="file" required auto-complete="off" @change="videoChange"/>
      </el-form-item>
        <quill-editor
        ref="editor"
        style="height: 400px; margin-bottom: 87px"
        :options="newOption"
        v-model="editorContent"
        @change="editorChange">
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
        courseDesc: ""
      },
      cateId: "",
      cateList: [],
      loading: false,
      editorContent: "",
      files: [],
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
    this.getCateList();
  },
  watch: {},
  methods: {
    getCateList() {
      let self = this;
      api.get(config.baseUrl + "/sm/cate/list").then(res => {
        if (res.data.status == 0) {
          self.cateList = res.data.data;
          self.cateId = res.data.data[0].cateId;
        }
      });
    },
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (
          valid &&
          this.cateId &&
          this.files[0] &&
          this.files[1] &&
          this.editorContent
        ) {
          let formData = new FormData();
          formData.append("courseName", this.form.courseName);
          formData.append("cateId", this.cateId);
          formData.append("courseDesc", this.form.courseDesc);
          formData.append("courseDetail", this.editorContent);
          formData.append("file", this.files[0]);
          formData.append("file", this.files[1]);
          this.loading = true;
          api
            .postFile(config.baseUrl + "/sm/course/add", formData)
            .then(res => {
              if (res.data.status == 0) {
                this.$message({
                  type: "success",
                  message: "新增成功!"
                });
                this.loading = false;
                this.$router.push("/home/course");
              }
            })
            .catch(res => {
              this.loading = false;
            });
        } else {
          if (!this.files[0] || !this.files[1]) {
            this.$message({
              type: "warning",
              message: "请先选择文件!"
            });
            return false;
          }
          if (!this.editorContent) {
            this.$message({
              type: "warning ",
              message: "富文本不得为空!"
            });
            return false;
          }
          if (!this.cateId) {
            this.$message({
              type: "warning ",
              message: "没有分类!"
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
      this.$router.push("/home/course");
    },
    editorChange() {}
  }
};
</script>

<style lang="scss" scoped>

</style>

<template>
<div>
  <div class="toobar">
  <el-button type="primary" @click="toCreate">新增</el-button>
  </div>
  <el-table
    :data="tableData"
    stripe
    >
    <el-table-column
      prop="sort"
      label="序号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="videoName"
      label="视频名称"
      width="180">
      <template slot-scope="scope">
        <router-link :to="{name:'videoDetail', params: { id: scope.row.adVideoId }}">{{scope.row.videoName}}</router-link>
      </template>
    </el-table-column>
    <el-table-column
      prop="videoImgUrl"
      label="展示图片">
        <template slot-scope="scope">
        <img :src="scope.row.videoImgUrl" alt="展示图片">
      </template>
    </el-table-column>
    <el-table-column
      prop="statusStr"
      label="状态"
      width="180">
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="scope">
        <a href="javascript:void(0)" @click="offVideo(scope.row.adVideoId)" v-if="scope.row.statusStr=='上架'" >下架</a>
        <a href="javascript:void(0)" @click="onVideo(scope.row.adVideoId)" v-if="scope.row.statusStr=='下架'" >上架</a>
        <a href="javascript:void(0)" @click="deleteVideo(scope.row.adVideoId)">删除</a>
        <a href="javascript:void(0)" @click="editVideoBtn(scope.row)">编辑</a>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog title="编辑" :visible.sync="dialogFormVisible">
    <el-form ref="ruleForm" :rules="rules" :model="form" label-width="80px">
      <el-form-item prop="videoName"  label="视频名称">
        <el-input v-model="form.videoName" required auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item prop="sort" label="序号">
        <el-input v-model="form.sort" type="number" required auto-complete="off"></el-input>
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
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="editVideo">确 定</el-button>
    </div>
  </el-dialog>
</div>  

</template>
<script>
import api from "@/api/api";
import config from "@/config/config.js";
export default {
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      action: config.baseUrl + "/sm/adVideo/update",
      form: {
        videoName: "",
        sort: "",
        adVideoId: ""
      },
      file: [],
      rules: {
        videoName: [{ required: true, message: "必填项", trigger: "change" }],
        sort: [{ required: true, message: "必填项", trigger: "change" }]
      }
    };
  },
  created() {
    this.getTable();
  },
  methods: {
    getTable() {
      let self = this;
      api.get(config.baseUrl + "/sm/adVideo/list").then(res => {
        if (res.data.status == 0) {
          self.tableData = res.data.data;
        }
      });
    },
    toCreate() {
      this.$router.push({ path: "/home/video/createVideo" });
    },
    onVideo(id) {
      this.$confirm("确定要上架该视频吗", "操作", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      }).then(() => {
        api.put(config.baseUrl + "/sm/course/shangjia/" + id).then(res => {
          if (res.data.status == 0) {
            this.$message({
              type: "success",
              message: "上架成功!"
            });
          }
          this.getTable();
        });
      });
    },
    offVideo(id) {
      this.$confirm("确定要下架该视频吗", "操作", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        api.put(config.baseUrl + "/sm/course/xiajia/" + id).then(res => {
          if (res.data.status == 0) {
            this.$message({
              type: "success",
              message: "下架成功!"
            });
          }
          this.getTable();
        });
      });
    },
    deleteVideo(id) {
      this.$confirm("确定要删除该视频吗", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        api.delete(config.baseUrl + "/sm/adVideo/delete/" + id).then(res => {
          if (res.data.status == 0) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          }
          this.getTable();
        });
      });
    },
    editVideoBtn(row) {
      this.dialogFormVisible = true;
      this.form.adVideoId = row.adVideoId;
      this.form.videoName = row.videoName;
      this.form.sort = row.sort;
      this.file = [];
    },
    editVideo() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this.$refs.upload.uploadFiles.length == 0) {
            this.$message({
              type: "warning ",
              message: "请先选择图片!"
            });
            return false;
          }
          this.$refs.upload.submit();
        } else {
          return false;
        }
      });
    },
    onSuccess(res) {
      if (res.status == 0) {
        this.$message({
          type: "success",
          message: "编辑成功!"
        });
      }
      this.dialogFormVisible = false;
      this.getTable();
    }
  }
};
</script>

<style lang="scss" scoped>
.toobar {
  margin-bottom: 20px;
  .form-group {
    float: left;
    padding: 0 20px 20px 0;
    width: 40%;
    .el-input {
      width: 65%;
    }
  }
}
table {
  td {
    img {
      height: 80px;
    }
  }
}
</style>


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
      label="序号">
    </el-table-column>
    <el-table-column
      prop="content"
      label="内容">
    </el-table-column>
    <el-table-column
      prop="statusStr"
      label="状态">
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="scope">
        <a href="javascript:void(0)" v-if="scope.row.statusStr=='上架'" @click="offNotice(scope.row.id)">下架</a>
        <a href="javascript:void(0)" v-if="scope.row.statusStr=='下架'" @click="onNotice(scope.row.id)">上架</a>
        <a href="javascript:void(0)" @click="deleteNotice(scope.row.id)">删除</a>
        <a href="javascript:void(0)" @click="editNoticeBtn(scope.row)">编辑</a>
      </template>
    </el-table-column>
  </el-table>
  
  <el-dialog title="编辑" :visible.sync="dialogFormVisible">
    <el-form ref="ruleForm" :rules="rules" :model="form" label-width="80px">
      <el-form-item prop="content"  label="内容">
        <el-input v-model="form.content" required auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item prop="sort" label="序号">
        <el-input v-model="form.sort" type="number" required auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="editNotice">确 定</el-button>
    </div>
  </el-dialog>
    <el-dialog title="新增" :visible.sync="createFormVisible">
    <el-form ref="createRuleForm" :rules="createRules" :model="createform" label-width="80px">
      <el-form-item prop="content"  label="内容">
        <el-input v-model="createform.content" required auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item prop="sort" label="序号">
        <el-input v-model="createform.sort" type="number" required auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="createFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="createNotice">确 定</el-button>
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
      createFormVisible: false,
      id: "",
      form: {
        content: "",
        sort: ""
      },
      createform: {
        content: "",
        sort: ""
      },
      rules: {
        content: [{ required: true, message: "必填项", trigger: "change" }],
        sort: [{ required: true, message: "必填项", trigger: "change" }]
      },
      createRules: {
        content: [{ required: true, message: "必填项", trigger: "change" }],
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
      api.get(config.baseUrl + "/sm/notice").then(res => {
        if (res.data.status == 0) {
          self.tableData = res.data.data;
        }
      });
    },
    toCreate() {
      this.createFormVisible = true;
    },
    offNotice(id) {
      this.$confirm("确定要下架该通知吗", "操作", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        api.put(config.baseUrl + "/sm/notice/xiajia/" + id).then(res => {
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
    onNotice(id) {
      this.$confirm("确定要上架该通知吗", "操作", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      }).then(() => {
        api.put(config.baseUrl + "/sm/notice/shangjia/" + id).then(res => {
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
    deleteNotice(id) {
      this.$confirm("确定要删除该通知吗", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        api.delete(config.baseUrl + "/sm/notice/delete/" + id).then(res => {
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

    editNoticeBtn(row) {
      this.dialogFormVisible = true;
      this.id = row.id;
      this.form.content = row.content;
      this.form.sort = row.sort;
    },
    editNotice() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          api
            .postForm(config.baseUrl + "/sm/notice/update", {
              noticeId: this.id,
              content: this.form.content,
              sort: this.form.sort
            })
            .then(res => {
              if (res.data.status == 0) {
                this.$message({
                  type: "success",
                  message: "编辑成功!"
                });
              }
              this.dialogFormVisible = false;
              this.getTable();
            });
        } else {
          return false;
        }
      });
    },
    createNotice() {
      this.$refs.createRuleForm.validate(valid => {
        if (valid) {
          api
            .postForm(config.baseUrl + "/sm/notice/add", {
              content: this.createform.content,
              sort: this.createform.sort
            })
            .then(res => {
              if (res.data.status == 0) {
                this.$message({
                  type: "success",
                  message: "新增通知成功!"
                });
              }
              this.createFormVisible = false;
              this.getTable();
            });
        } else {
          return false;
        }
      });
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


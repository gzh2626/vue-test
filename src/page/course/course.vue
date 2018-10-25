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
      prop="courseName"
      label="课程名称"
      width="180">
      <template slot-scope="scope">
        <router-link :to="{name:'courseDetail', params: { id: scope.row.courseId }}">{{scope.row.courseName}}</router-link>
      </template>
    </el-table-column>
    <el-table-column
      prop="showImg"
      label="展示图片">
        <template slot-scope="scope">
        <img :src="scope.row.showImg" alt="展示图片">
      </template>
    </el-table-column>
    <el-table-column
      prop="watchNums"
      label="观看人数"
      width="180">
    </el-table-column>
    <el-table-column
      prop="courseDesc"
      label="课程描述"
      width="180">
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态"
      width="180">
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="scope">
        <a href="javascript:void(0)" @click="offCourse(scope.row.courseId)" v-if="scope.row.status=='上架'">下架</a>
        <a href="javascript:void(0)" @click="onCourse(scope.row.courseId)" v-if="scope.row.status=='下架'">上架</a>
        <a href="javascript:void(0)" @click="deleteCourse(scope.row.courseId)">删除</a>
        <router-link :to="{name:'editCourse', params: { id: scope.row.courseId }}">编辑</router-link>
      </template>
    </el-table-column>
    
  </el-table>
    <el-pagination
    @current-change="handleCurrentChange"
    :current-page.sync="currentPage"
    :page-size="100"
    layout="total, prev, pager, next"
    :total="totalCount">
  </el-pagination>
</div>  

</template>
<script>
import api from "@/api/api";
import config from "@/config/config.js";
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      totalCount: 0
    };
  },
  created() {
    this.getTable();
  },
  methods: {
    getTable() {
      let self = this;
      let data = {
        page: this.currentPage,
        size: 10
      };
      api.get(config.baseUrl + "/sm/course/list", data).then(res => {
        if (res.data.status == 0) {
          self.tableData = res.data.data.content;
          self.totalCount = res.data.data.totalCount;
        }
      });
    },
    handleCurrentChange(val) {
      this.getTable();
    },
    toCreate() {
      this.$router.push({ path: "/home/course/createCourse" });
    },
    onCourse(id) {
      this.$confirm("确定要上架该课程吗", "操作", {
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
    offCourse(id) {
      this.$confirm("确定要下架该课程吗", "操作", {
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
    deleteCourse(id) {
      this.$confirm("确定要删除该课程吗", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        api.delete(config.baseUrl + "/sm/course/delete/" + id).then(res => {
          if (res.data.status == 0) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          }
          this.getTable();
        });
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


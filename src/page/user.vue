<template>
<div class="user-data">
  <div class="toobar">
    <div class="form-group">
     孩子姓名：<el-input v-model="name" placeholder="请输入内容"></el-input>
    </div>
    <div class="form-group">     
      手机号：<el-input v-model="phone" placeholder="请输入内容"></el-input>
    </div>
  </div>
  <el-table
    :data="tableData"
    @filter-change="filterTable"
    stripe
    >
    <el-table-column
      prop="childName"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="手机号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="childClassName"
      label="年级"
      column-key="class"
      :filters="[{ text: '一年级', value: '1' },{ text: '二年级', value: '2' },{ text: '三年级', value: '3' },{ text: '四年级', value: '4' },{ text: '五年级', value: '5' },{ text: '六年级', value: '6' }]"
      filter-placement="bottom-start"
      :filter-multiple="false">
    </el-table-column>
    <el-table-column
      prop="isBelong"
      label="是否育苗学员"
      width="180"
      :filters="[{ text: '是', value: '1' },{ text: '否', value: '0' }]"
      column-key="isBelong"
      filter-placement="bottom-start"
      :filter-multiple="false">
       <template slot-scope="scope">
         {{ scope.row.isBelong?'是':'否' }}
      </template>
    </el-table-column>
    <el-table-column
      prop="createdStr"
      label="注册时间">
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
      name: "",
      phone: "",
      childClass: null,
      isBelong: null,
      currentPage: 1,
      totalCount: 0
    };
  },
  created() {
    this.getUser();
  },
  watch: {
    name() {
      this.getUser();
    },
    phone() {
      this.getUser();
    }
  },
  methods: {
    getUser() {
      let self = this;
      let data = {
        childName: this.name || null,
        phone: this.phone || null,
        childClass: this.childClass || null,
        isBelong: this.isBelong || null,
        page: this.currentPage,
        size: 10
      };
      api.get(config.baseUrl + "/sm/wxuser/list", data).then(res => {
        if (res.data.status == 0) {
          self.tableData = res.data.data.content;
          self.totalCount = res.data.data.totalCount;
        }
      });
    },
    filterTable(value) {
      for (let key in value) {
        if (key == "class") {
          this.childClass = value[key][0] || null;
        } else {
          this.isBelong = value[key][0] || null;
        }
      }
      this.getUser();
    },
    handleCurrentChange(val) {
      this.getUser();
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

</style>


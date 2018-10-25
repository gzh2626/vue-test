<template>
  <div id="nav">
    <el-menu
      router
      :default-active="activeIndex"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="/home/user">
        <template slot="title">
          <i class="el-icon-location"></i>
        <span slot="title">用户列表</span>
        </template>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>内容管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/home/video" :class="{'is-active':$route.path.indexOf('Video')!=-1}">视频管理</el-menu-item>
          <el-menu-item index="/home/course">课程管理</el-menu-item>
          <el-menu-item index="/home/classify">分类管理</el-menu-item>
          <el-menu-item index="/home/notice">通知管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: ""
    };
  },
  created() {
    this.updateIndex();
  },
  methods: {
    updateIndex() {
      let indexArr = this.$route.path.split("/");
      this.activeIndex = "/" + indexArr[1] + "/" + indexArr[2];
    }
  },
  beforeUpdate() {
    this.updateIndex();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"  scoped>
#nav {
  width: 200px;
  z-index: 100;
  background: rgb(84, 92, 100);
  height: 100%;
  float: left;
  position: relative;
  .el-menu {
    height: 100%;
  }
}
</style>

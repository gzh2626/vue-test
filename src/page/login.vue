<template>
    <div class="login">
      <div class="login-controller">
          <div class="login-title">
              <span class="title-line"></span>
              <span class="title-message">登录</span>
              <span class="title-line"></span>
          </div>
          <el-form ref="ruleForm" :rules="rules" :model="form" label-width="80px">
            <el-form-item prop="name" label-width="0">
                <el-input v-model="form.name" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password" label-width="0">
                <el-input v-model="form.password" type="password" placeholder="密码"  @keyup.enter.native="onSubmit"></el-input>
            </el-form-item>
            <el-form-item label-width="0">
                <el-button type="primary" @click="onSubmit">登录</el-button>
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
        name: "",
        password: ""
      },
      verificationImage: "",
      rules: {
        name: [{ required: true, message: "必填项", trigger: "change" }],
        password: [{ required: true, message: "必填项", trigger: "change" }]
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          var username = this.form.name;
          var password = this.form.password;
          api
            .postForm(config.baseUrl + "/sm/login", {
              userName: username,
              password: password
            })
            .then(res => {
              this.$router.push("/home/user");
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
.login {
  height: 100%;
  width: 100%;
  background: #efefef;
  .login-controller {
    width: 500px;
    margin: 0 auto;
    background: #fff;
    padding: 20px 30px;
    position: relative;
    top:200px;
  }
  .login-title {
    padding-bottom: 30px;
    .title-line {
      display: inline-block;
      width: 147px;
      height: 0;
      border-top: 3px solid #344563;
    }
    .title-message {
      vertical-align: middle;
      font-size: 20px;
      display: inline-block;
      height: 26px;
      color: #344563;
      width: 135px;
      text-align: center;
      padding: 0 30px;
    }
  }
  .el-button.el-button--primary{
    width:100%;
    margin:0 auto;
    display: block;
  }
}
</style>


<template>
  <div class="login-wrapper">
    <h3 class="login-title">登录</h3>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username" required>
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" required>
        <el-input type="password" v-model="ruleForm.password" @keydown.enter.native="submitForm('ruleForm')"></el-input>
        <el-button type="text" class="forget_password">忘记密码</el-button>
      </el-form-item>
      <el-form-item class="submit_wrapper">
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        <span>还没有账号？</span>
        <el-button type="text" @click="goRegister">立即注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { login } from "@/assets/js/connect";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  mounted() {
    let loginStatus = sessionStorage.getItem("loginStatus");
    if (loginStatus == 1) {
      if (this.getUserInfo.username != undefined) {
        this.ruleForm = this.getUserInfo;
        this.$nextTick(() => {
          this.submitForm("ruleForm");
        });
      }
    }
  },
  computed: {
    ...mapGetters(["getUserInfo"])
  },
  methods: {
    submitForm(formName) {
      let self = this;
      self.$refs[formName].validate(valid => {
        if (valid) {
          login(self.ruleForm).then(res => {
            console.log(res.data);
            if (res.data.status === 0) {
              let userInfo = res.data.data.user;
              console.log(self.$store.state.userInfo);
              let saveInfo = {
                password: userInfo[0].password,
                username: userInfo[0].username,
                id:userInfo[0]._id,
                token:res.data.data.token
              };
              sessionStorage.setItem("loginStatus", "1");
              self.commitUserInfo(saveInfo);
              if (userInfo[0].userAdmin == 0) {
                self.$router.push({
                  path: "/index"
                });
              } else if (userInfo[0].userAdmin == 1) {
                self.$router.push({
                  path: `/adminIndex`
                });
              }
            } else {
              self.$message({
                message: res.data.message,
                type: "error",
                duration: 2000
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    goRegister() {
      this.$router.push({ path: "/register" });
    },
    ...mapActions(["commitUserInfo"])
  }
};
</script>
<style scoped>
.login-wrapper {
  width: 50vw;
  margin: 0 auto;
  max-width: 400px;
}
.login-title {
  text-align: center;
  padding: 8vh 0;
}
.submit_wrapper{
  margin-top: 30px;
}
.forget_password{
  margin-left: 15px;
  position: absolute;
  right: -70px;
  top: 0;
}
</style>



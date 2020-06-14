<template>
  <div class="login-container">
    <div class="login-box">
      <div class="avatat">
        <img src="../assets/logo.png" />
      </div>
      <el-form ref="formRef" :rules="rules" class="form-box" label-width="0px" :model="form">
        <!-- 登录表单 -->
        <el-form-item prop="username">
          <el-input prefix-icon="el-icon-user" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" prefix-icon="el-icon-lock" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      // 验证信息
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 6, max: 16, message: "长度为6～16字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 16, message: "长度为6～16字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    resetLoginForm() {
      this.$refs.formRef.resetFields();
    },
    login() {
      this.$refs.formRef.validate(valid=>{
        console.log(valid)
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  background-image: url("../assets/imgs/night.gif");
  height: 100%;
  .login-box {
    height: 18rem;
    width: 27rem;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5px;
    .avatat {
      width: 9rem;
      height: 9rem;
      border: 1px solid #eee;
      border-radius: 50%;
      box-shadow: 0 0 10px #ddd;
      background-color: rgba($color: #eee, $alpha: 0.3);
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      img {
        width: 100%;
        height: 100%;
      }
    }
    .form-box {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 0 1rem;
      box-sizing: border-box;
      /deep/.el-form-item {
        margin-bottom: 1.37rem;
      }
      /deep/.el-input__inner {
        height: 2.5rem;
      }
      .btns {
        display: flex;
        justify-content: flex-end;
        margin-right: 1rem;
      }
    }
  }
}
</style>

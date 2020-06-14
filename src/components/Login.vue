<template>
  <div class="login-container">
    <div class="login-box">
      <div class="avatat">
        <img src="../assets/logo.png" />
      </div>
      <el-from label-width="0px">
        <el-from-item></el-from-item>
      </el-from>
    </div>
  </div>
</template>

<script>
export default {};
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
      width: 10rem;
      height: 10rem;
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
  }
}
</style>

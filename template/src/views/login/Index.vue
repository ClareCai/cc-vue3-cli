<template>
  <!-- 登录页面 -->
  <div class="login-container">
    <div class="login-box">
      <div class="login-left">
        <img class="login-left-img" src="@/assets/images/login_left.png" alt="login" />
      </div>
      <div class="login-form">
        <LoginForm></LoginForm>
      </div>
    </div>
  </div>
</template>

<script setup name="Login">
import LoginForm from './components/LoginForm.vue';
</script>

<style lang="less" scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 70px);
  min-height: 550px;
  background-color: #f6f9fe;

  .login-box {
    box-sizing: border-box;
    display: flex;
    width: 1296px;
    height: 527px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 8px 20px 0 rgb(139 147 167 / 18%);

    .login-left {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 793px;
      border-right: 1px solid #e3e7ef;

      .login-left-img {
        width: 80%;
        height: 80%;
      }
    }

    .login-form {
      flex: 1;
      padding: 32px 42px;

      .login-logo {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px 0;

        .logo-text {
          padding-left: 20px;
          margin: 0;
          font-size: 18px;
          font-weight: bold;
          color: #34495e;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>

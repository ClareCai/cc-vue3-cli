<template>
  <!-- 登录表单 -->
  <div class="login-title">登录您的帐户</div>
  <el-form
    ref="nameFormRef"
    size="large"
    :model="nameFormData"
    :rules="rules"
    label-width="70px"
    label-position="left"
    class="login-form"
  >
    <el-form-item label="账号" prop="username">
      <el-input v-model="nameFormData.username" placeholder="请输入账号/邮箱"> </el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        v-model="nameFormData.password"
        type="password"
        show-password
        placeholder="请输入密码"
      >
      </el-input>
    </el-form-item>
    <el-form-item label="验证码" prop="code">
      <div class="code-input-container">
        <el-input
          v-model="nameFormData.code"
          placeholder="请输入验证码"
          @keyup.enter="onLoginClick"
        >
        </el-input>
        <img :src="codeUrl" class="code-img" @click="getVerify" />
      </div>
    </el-form-item>
  </el-form>
  <el-checkbox v-model="rememberMe">记住密码</el-checkbox>
  <el-button size="large" type="primary" class="login-btn" @click="onLoginClick">
    立即登录
  </el-button>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { Base64 } from 'js-base64';
import { useUserStore } from '@/store/modules/user';

const router = useRouter();
const userStore = useUserStore();
const codeUrl = ref('');
const rememberMe = ref(false);
const nameFormRef = ref();
const nameFormData = ref({
  username: '',
  password: '',
  code: '',
});
const rules = reactive({
  username: [{ required: true, message: '请输入账号/邮箱!', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码!', trigger: 'blur' }],
  code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
});
// 登录
const onLoginClick = () => {
  nameFormRef.value.validate().then(() => {
    // const timeStamp = `${new Date().getTime()}`;
    // const params = {
    //   registType: 1,
    //   timeStamp,
    //   pwdToken: encryption(nameFormData.value.password + timeStamp),
    //   userToken: encryption(nameFormData.value.username + timeStamp),
    //   code: nameFormData.value.code,
    // };
    // loginApi(params)
    //   .then(() => {
    if (rememberMe.value) {
      setStorage('user-account', Base64.encode(nameFormData.value.username));
      setStorage('user-password', Base64.encode(nameFormData.value.password));
    } else {
      removeStorage('user-account');
      removeStorage('user-password');
    }
    gotoHomepage();
    //   })
    //   .catch(() => {
    getVerify();
    //   });
  });
};
// 页面加载时从localStorage获取登录信息
const setAccount = () => {
  const account = Base64.decode(getStorage('user-account'));
  const password = Base64.decode(getStorage('user-password'));
  if (account && password) {
    nameFormData.value.username = account;
    nameFormData.value.password = password;
    rememberMe.value = true;
  } else {
    nameFormData.value.username = '';
    nameFormData.value.password = '';
  }
};
// 获取验证码
const getVerify = () => {
  const domain = import.meta.env.DEV ? '' : window.location.origin;
  codeUrl.value = `${domain}${
    import.meta.env.VITE_API_PATH
  }/login/getVerify?id=${new Date().getTime()}`;
};
getVerify();
const gotoHomepage = () => {
  userStore.getUserInfo().then(() => {
    router.push('/homePage');
  });
};
const getStorage = (key) => {
  return localStorage.getItem(key) || '';
};
const setStorage = (key, value) => {
  localStorage.setItem(key, value);
};
const removeStorage = (key) => {
  localStorage.removeItem(key);
};
setAccount();
</script>

<style scoped lang="less">
.login-title {
  margin-bottom: 4px;
  font-size: 24px;
  font-weight: 500;
  line-height: 36px;
}

.register-content {
  font-size: 14px;
  line-height: 14px;
  color: #b5b5be;

  .register-content-text {
    color: var(--el-color-primary);
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
}

.login-form {
  margin-top: 32px;

  .code-input-container {
    display: flex;
    align-items: center;
    width: 100%;

    .code-img {
      min-width: 90px;
      height: 30px;
      margin-left: 10px;
      cursor: pointer;
    }
  }
}

.login-btn {
  width: 100%;
  height: 48px;
  margin: 24px 0;
  font-size: 16px;
  line-height: 48px;
}
</style>

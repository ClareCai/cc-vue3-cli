import axios from 'axios';
import { ElMessage } from 'element-plus';
import { showFullScreenLoading, tryHideFullScreenLoading } from './serviceLoading';
import router from '@/router';
import { useUserStore } from '@/store/modules/user';
import { getBaseUrl } from './env';
import { checkStatus } from './checkStatus';

const MyMessage = {
  success(text) {
    ElMessage.success(text);
  },
  error(text) {
    ElMessage.error(text);
  },
};
let loginErrorFlag = false;
// 创建请求实例
const instance = axios.create({
  // 指定请求超时的毫秒数
  timeout: 6000000,
  // 跨域时候允许携带凭证
  withCredentials: true,
  headers: {
    post: {
      'Content-Type': 'application/json',
    },
  },
});

const instanceFile = axios.create({
  // 指定请求超时的毫秒数
  timeout: 6000000,
  // 跨域时候允许携带凭证
  withCredentials: true,
  headers: {
    post: {
      'Content-Type': 'multipart/form-data',
    },
  },
});

const baseUrl = getBaseUrl();
// 前置拦截器（发起请求之前的拦截）
const requestInterceptors = [
  (config) => {
    if (!/^\//.test(config.url)) {
      config.url = `/${config.url}`;
    }
    config.url = `${baseUrl}${config.url}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
];
instance.interceptors.request.use(...requestInterceptors);
instanceFile.interceptors.request.use(...requestInterceptors);

// response拦截器（获取到响应时的拦截）
const responseInterceptors = [
  (response) => {
    if (response.config.responseType === 'arraybuffer') {
      return response;
    }
    const { data = {} } = response;
    const userStore = useUserStore();
    tryHideFullScreenLoading();
    if (data.code === 401 && !loginErrorFlag) {
      loginErrorFlag = true;
      MyMessage.error('登录失效！请您重新登录');
      userStore.logout();
      setTimeout(() => {
        router.replace('/login');
      }, 500);
      return Promise.reject(data);
    }
    return data;
  },
  (error) => {
    const { response } = error;
    tryHideFullScreenLoading();
    // 请求超时 && 网络错误单独判断，没有 response
    if (error.message.indexOf('timeout') !== -1) MyMessage.error('请求超时！请您稍后重试');
    if (error.message.indexOf('Network Error') !== -1) MyMessage.error('网络错误！请您稍后重试');
    // 根据服务器响应的错误状态码，做不同的处理
    if (response) checkStatus(response.status);
    // 服务器结果都没有返回(可能服务器错误可能客户端断网)，断网处理:可以跳转到断网页面
    if (!window.navigator.onLine) router.replace('/500');
    return Promise.reject(error.response);
  },
];
instance.interceptors.response.use(...responseInterceptors);
instanceFile.interceptors.response.use(...responseInterceptors);

const requestCommon = function (type) {
  return function ({
    responseType = 'json',
    url,
    data,
    query = {},
    autoErrorMsg = true,
    autoSuccessMsg,
    noLoading = false,
  }) {
    if (!noLoading) {
      showFullScreenLoading();
    }
    return new Promise((resolve, reject) => {
      instance({
        method: type,
        url,
        data,
        params: query,
        responseType,
      })
        .then((res) => {
          if (!res.success) {
            if (autoErrorMsg) {
              MyMessage.error(res.message || '没有错误消息message');
            }
            return reject(res);
          }
          if (autoSuccessMsg && res.message) {
            MyMessage.success(res.message);
          }
          resolve(res);
          return res;
        })
        .catch((error) => {
          if (autoErrorMsg && error.data) {
            MyMessage.error(error.data.message || '没有错误信息message');
            reject(error);
          }
          reject(error);
          return error;
        });
    });
  };
};

const requestFile = function (type) {
  return function ({
    responseType = 'json',
    url,
    data,
    query = {},
    autoErrorMsg = true,
    autoSuccessMsg = false,
    noLoading = false,
  }) {
    if (!noLoading) {
      showFullScreenLoading();
    }
    const fileData = new FormData();
    Object.keys(data).forEach((item) => {
      fileData.append(item, data[item]);
    });
    return new Promise((resolve, reject) => {
      instanceFile({
        method: type,
        url,
        data: fileData,
        params: query,
        responseType,
      })
        .then((res) => {
          if (!res.success) {
            if (autoErrorMsg) {
              MyMessage.error(res.message || '没有错误消息message');
            }
            return reject(res);
          }
          if (autoSuccessMsg && res.message) {
            MyMessage.success(res.message);
          }
          resolve(res);
          return res;
        })
        .catch((error) => {
          if (autoErrorMsg) {
            MyMessage.error(error.response.data.message || '没有错误信息message');
            reject(error);
          }
          reject(error);
          return error;
        });
    });
  };
};
// 导出常用函数

export const post = (options) => {
  return requestCommon('post')(options);
};
export const put = (options) => {
  return requestCommon('put')(options);
};
export const get = (options) => {
  return requestCommon('get')(options);
};
export const del = (options) => {
  return requestCommon('delete')(options);
};

export const file = (options) => {
  return requestFile('post')(options);
};

export default instance;

export const loginErrorRefresh = () => {
  loginErrorFlag = false;
};

import { defineStore } from 'pinia';
import piniaPersistConfig from '../utils/piniaPersist';

export const useUserStore = defineStore('user-store', {
  state: () => ({
    userInfo: {},
    permListWebsite: [],
    authMapWebsite: {},
  }),
  getters: {
    userId(state) {
      return state.userInfo?.id;
    },
    tenantId(state) {
      return state.userInfo?.tenantId;
    },
    username(state) {
      return state.userInfo?.username;
    },
    hasAuth(state) {
      return (id) => {
        return state.authMapWebsite[id];
      };
    },
    isLogined(state) {
      return !!state.userInfo?.id;
    },
  },
  actions: {
    logout() {
      this.userInfo = {};
      this.permListWebsite = [];
      this.authMapWebsite = {};
    },
    getUserInfo() {
      // return getCurrentInfoApi().then((res) => {
      //   this.userInfo = res.data[0] || {};
      //   return Promise.resolve();
      // });
    },
    getUserPerm() {
      // const getAuthList = () => {
      //   const authMapWebsite = {};
      //   const getAuth = (permListWebsite, parentCode = '', parentName = '') => {
      //     permListWebsite?.forEach((item) => {
      //       const code = (parentCode ? `${parentCode}_` : '') + item.code;
      //       const name = (parentName ? `${parentName}-` : '') + item.name;
      //       authMapWebsite[code] = name;
      //       if (item.children) {
      //         getAuth(item.children, code, name);
      //       }
      //     });
      //   };
      //   getAuth(this.permListWebsite);
      //   this.authMapWebsite = authMapWebsite;
      // };
      // return getUserPermApi().then((res) => {
      //   this.permListWebsite = res.data[0].permList;
      //   getAuthList();
      //   return Promise.resolve();
      // });
    },
  },
  persist: piniaPersistConfig('chinaculture-user-store'),
});

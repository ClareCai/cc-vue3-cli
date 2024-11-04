import { createRouter, createWebHashHistory } from 'vue-router';
import { loginErrorRefresh } from '@/utils/request.js';
import NProgress from '@/config/nprogress';

import routerConfig from './modules/index';

const router = createRouter({
  history: createWebHashHistory(),
  routes: routerConfig,
  scrollBehavior() {
    return {
      el: '#app',
      top: 0,
    };
  },
});

/**
 * @description 路由拦截 beforeEach
 * */
router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

/**
 * @description 路由跳转结束
 * */
router.afterEach((to) => {
  NProgress.done();
  if (to.path === '/login') {
    loginErrorRefresh();
  }
});
export default router;

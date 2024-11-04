export default [
  {
    path: '/',
    name: 'home',
    redirect: '/homePage',
    component: () => import('@/views/home/Index.vue'),
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/Index.vue'),
      },
      {
        path: '/homePage',
        name: 'homePage',
        component: () => import('@/views/homePage/HomePage.vue'),
      },
    ],
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/components/ErrorMessage/403.vue'),
    meta: {
      title: '403页面',
    },
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/components/ErrorMessage/404.vue'),
    meta: {
      title: '404页面',
    },
  },
  {
    path: '/500',
    name: '500',
    component: () => import('@/components/ErrorMessage/500.vue'),
    meta: {
      title: '500页面',
    },
  },
  // Resolve refresh page, route warnings
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/components/ErrorMessage/404.vue'),
  },
];

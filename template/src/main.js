import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import directives from '@/directives/index';
import 'virtual:svg-icons-register';
import UI from '@/components/index.js';

import '@/style/index.less';
import 'element-plus/dist/index.css';

createApp(App).use(router).use(directives).use(store).use(UI).mount('#app');

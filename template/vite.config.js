import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import vueJsx from '@vitejs/plugin-vue-jsx';
import setupExtend from 'vite-plugin-vue-setup-extend';

export default ({ mode }) => {
  const { VITE_PUBLIC_PATH } = loadEnv(mode, process.cwd());

  return defineConfig({
    base: VITE_PUBLIC_PATH,
    plugins: [
      vue(),
      AutoImport({
        resolvers: [
          // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
          // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
          //
          ElementPlusResolver(),
        ],
      }),
      Components({
        resolvers: [
          // Auto register Element Plus components
          // 自动导入 Element Plus 组件
          ElementPlusResolver(),
        ],
      }),
      vueJsx(),
      // name 可以写在 script 标签上
      setupExtend(),
      // 使用 svg 图标
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[name]',
      }),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: `true; @import (reference) "${resolve('src/style/variables.less')}";`,
          },
          math: 'strict',
          javascriptEnabled: true,
          // 在这里指定全局导入的文件
          additionalData: `@import "src/style/mixins.less";`,
        },
      },
    },
    server: {
      // 是否开启 https
      https: false,
      // 端口号
      port: 8866,
      // 监听所有地址
      host: '0.0.0.0',
      // 服务启动时是否自动打开浏览器
      open: true,
      // 允许跨域
      cors: true,
      // 自定义代理规则
      proxy: {
        '/api': {
          target: '******',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    build: {
      // 设置最终构建的浏览器兼容目标
      target: 'es2015',
      // 构建后是否生成 source map 文件
      sourcemap: false,
      //  chunk 大小警告的限制（以 kbs 为单位）
      chunkSizeWarningLimit: 2000,
      // 启用/禁用 gzip 压缩大小报告
      reportCompressedSize: false,
    },
  });
};

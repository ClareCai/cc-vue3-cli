<template>
  <el-config-provider :locale="zhCn" :button="{ autoInsertSpace: false }">
    <RouterView />
  </el-config-provider>
</template>

<script setup>
import { RouterView } from 'vue-router';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
</script>

<style scoped></style>

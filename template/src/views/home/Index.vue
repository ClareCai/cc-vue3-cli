<template>
  <div class="page-container">
    <!-- 网站头部 -->
    <div class="page-header">
      <div class="page-header-left"></div>
      <div class="page-header-right"></div>
    </div>
    <div class="content-container">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script setup name="Home">
import { RouterView } from 'vue-router';
</script>

<style lang="less" scoped>
.page-container {
  min-width: 1600px;
  height: 100%;

  .page-header {
    position: relative;
    z-index: 1;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 70px;
    padding: 0 24px;
    background-color: white;
    box-shadow: 0 2px 16px 0 rgb(231 231 231 / 45%);

    .page-header-left {
      display: flex;
      flex: 1;
      align-items: center;
    }

    .page-header-right {
      display: flex;
      align-items: center;
    }
  }
}
</style>

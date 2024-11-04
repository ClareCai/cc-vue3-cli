<template>
  <el-dialog
    v-model="open"
    :title="title"
    :footer="null"
    fullscreen
    width="100%"
    class="full-modal"
  >
    <div class="image-preview-dialog">
      <img :src="imgUrlList[currentIndex]" alt="" class="image-preview" />
      <div class="image-preview-controls">
        <div class="custom-slick-arrow" @click="onClickLeftArrow">
          <i class="iconfont icon-arrow-left-s-line"></i>
        </div>
        <div class="image-preview-list">
          <div
            v-for="(url, index) in imgUrlList"
            :key="index"
            :class="[
              'image-preview-item',
              {
                active: index === currentIndex,
              },
            ]"
            @click="onClickImage(index)"
          >
            <img :src="url" alt="" />
          </div>
        </div>
        <div class="custom-slick-arrow" @click="onClickRightArrow">
          <i class="iconfont icon-arrow-right-s-line"></i>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup name="ImagePreviewDialog">
import { nextTick, ref } from 'vue';

const open = ref(false);
const title = ref('');
const imgUrlList = ref([]);
const currentIndex = ref(0);
const onClickLeftArrow = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  } else {
    currentIndex.value = imgUrlList.value.length - 1;
  }
  scrollImgToView();
};
const onClickRightArrow = () => {
  if (currentIndex.value < imgUrlList.value.length - 1) {
    currentIndex.value++;
  } else {
    currentIndex.value = 0;
  }
  scrollImgToView();
};
const scrollImgToView = () => {
  nextTick(() => {
    const activeImg = document.querySelector('.image-preview-item.active');
    if (activeImg) {
      activeImg.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  });
};
const onClickImage = (index) => {
  currentIndex.value = index;
};
const openDialog = (name, urlList) => {
  currentIndex.value = 0;
  title.value = name;
  imgUrlList.value = urlList;
  open.value = true;
};
defineExpose({
  openDialog,
});
</script>

<style lang="less" scoped>
.image-preview-dialog {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  .image-preview {
    max-height: 700px;
    vertical-align: middle;
    user-select: none;
    transform: translate(0, -80px);
  }

  .image-preview-controls {
    position: absolute;
    bottom: 0;
    left: 50%;
    display: flex;
    align-items: center;
    max-width: 90%;
    overflow: hidden;
    transform: translate(-50%, 0);

    .custom-slick-arrow {
      z-index: 1;
      flex: none;
      width: 24px;
      height: 24px;
      line-height: 24px;
      color: #fff;
      text-align: center;
      cursor: pointer;
      background: rgb(216 216 216 / 50%);
      border-radius: 4px;

      .iconfont {
        margin: 0 auto;
        font-size: 20px;
      }
    }

    .image-preview-list {
      display: flex;
      align-items: center;
      padding: 5px;
      margin: 0 20px;
      overflow: auto hidden;
      white-space: nowrap;
      background-color: rgb(0 0 0 / 50%);

      .image-preview-item {
        flex: none;
        width: 100px;
        height: 100px;
        margin: 0 5px;
        cursor: pointer;
        user-select: none;
        border: 2px solid transparent;

        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        &.active {
          border: 2px solid #fff;
        }
      }
    }
  }
}
</style>
<style lang="less">
.full-modal {
  background-color: transparent !important;

  .el-dialog__title {
    font-size: 20px;
    color: #fff;
  }

  .el-dialog__close {
    font-size: 20px !important;
    color: #fff !important ;
  }
}
</style>

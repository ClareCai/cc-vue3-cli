<template>
  <video-player
    class="video-player vjs-big-play-centered"
    :sources="[{ src }]"
    :poster="poster"
    crossorigin="anonymous"
    playsinline
    controls
    :autoplay="autoplay"
    :volume="0.6"
    :height="height"
    :playback-rates="[0.7, 1.0, 1.5, 2.0]"
    :plugins="{ qualityLevels, hlsQualitySelector }"
    :html5="{
      nativeTextTracks: false,
    }"
    @mounted="handleMounted"
  />
</template>

<script setup name="MyVideo">
import { shallowRef } from 'vue';
import { VideoPlayer } from '@videojs-player/vue';
import 'video.js/dist/video-js.css';
import qualityLevels from 'videojs-contrib-quality-levels';
import hlsQualitySelector from 'videojs-hls-quality-selector';

defineProps({
  src: {
    type: String,
    default: '',
  },
  poster: {
    type: String,
    default: '',
  },
  height: {
    type: Number,
    default: 630,
  },
  autoplay: {
    type: Boolean,
    default: false,
  },
});
const player = shallowRef();
const handleMounted = (payload) => {
  player.value = payload.player;
  console.log('Basic player mounted', payload);
};
</script>

<style lang="less" scoped>
.video-player {
  width: 100%;
  background-color: #666;
}
</style>

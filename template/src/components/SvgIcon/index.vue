<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script setup name="SvgIcon">
import { computed } from 'vue';

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  prefix: {
    type: String,
    default: 'icon',
  },
  className: {
    type: String,
    default: '',
  },
});

const symbolId = computed(() => `#${props.prefix}-${props.name}`);
const svgClass = computed(() => {
  if (props.className) {
    return `svg-icon ${props.className}`;
  }
  return 'svg-icon';
});
</script>
<style scope>
.svg-icon {
  width: 16px;
  height: 16px;
}
</style>

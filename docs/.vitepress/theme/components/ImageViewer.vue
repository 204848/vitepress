<script setup lang="ts">
import { onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'
import { Fancybox } from "@fancyapps/ui"
import "@fancyapps/ui/dist/fancybox/fancybox.css"

const route = useRoute()

const initFancybox = () => {
  // 销毁已有实例，防止重复绑定
  Fancybox.unbind('.vp-doc img')
  Fancybox.close()

  // 使用 (as any) 解决配置项重载报错
  Fancybox.bind('.vp-doc img:not(.no-zoom)', {
    groupAll: true,
    Image: {
      Panzoom: {
        maxScale: 3,
      },
    },
    Toolbar: {
      display: {
        left: ["infobar"],
        middle: ["zoomIn", "zoomOut", "toggle1to1", "rotateCCW", "rotateCW"],
        right: ["iterateZoom", "close"],
      },
    },
  } as any) // 关键点：这里加上 as any 绕过复杂的类型匹配
}

onMounted(() => initFancybox())

watch(
  () => route.path,
  () => {
    nextTick(() => initFancybox())
  }
)
</script>

<template>
  <div style="display: none"></div>
</template>

<style>
/* 保持之前的样式不变 */
.fancybox__backdrop {
  background: rgba(var(--image-zoom-bg, 255, 255, 255), 0.7) !important;
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
}

.dark .fancybox__backdrop {
  --image-zoom-bg: 24, 24, 27;
}

:root {
  --image-zoom-bg: 255, 255, 255;
}

.vp-doc img:not(.no-zoom) {
  cursor: zoom-in;
}
</style>
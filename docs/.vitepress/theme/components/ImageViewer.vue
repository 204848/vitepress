<script setup lang="ts">
import { onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'
// 注意：不要在顶部同步 import { Fancybox }，否则 build 依然会报错
import "@fancyapps/ui/dist/fancybox/fancybox.css"

const route = useRoute()

const initFancybox = async () => {
  // 仅在浏览器环境下执行
  if (typeof window === 'undefined') return

  // 动态导入 Fancybox
  const { Fancybox } = await import("@fancyapps/ui")

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
  } as any)
}

onMounted(() => {
  initFancybox()
})

watch(
  () => route.path,
  () => {
    // 路由变化后，等待 DOM 更新再初始化
    nextTick(() => initFancybox())
  }
)
</script>

<template>
  <div class="image-viewer-container" style="display: none"></div>
</template>

<style>
/* 保持你原来的样式不变 */
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
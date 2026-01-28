<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import backtotop from "./backtotop.vue";
import ImageViewer from "./ImageViewer.vue";
import { useData } from 'vitepress'
import { nextTick, provide } from 'vue'

const { isDark } = useData()

const enableTransitions = () =>
  'startViewTransition' in document &&
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches

provide('toggle-appearance', async ({ clientX: x, clientY: y }: MouseEvent) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value
    return
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )}px at ${x}px ${y}px)`
  ]

  const transition = document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  })

  transition.ready.then(() => {
    // 修复切换逻辑：变黑裁切新层，变白裁切旧层，100% 触发且不回弹
    const isReverse = !isDark.value
    document.documentElement.animate(
      { clipPath: isDark.value ? clipPath : [...clipPath].reverse() },
      {
        duration: 400,
        easing: 'ease-in-out',
        pseudoElement: isDark.value ? '::view-transition-new(root)' : '::view-transition-old(root)'
      }
    )
  })
})
</script>

<template>
  <DefaultTheme.Layout v-bind="$attrs">
    <template #layout-bottom>
      <ImageViewer />
    </template>
    <template #doc-footer-before>
      <backtotop />
    </template>
  </DefaultTheme.Layout>
</template>

<style>
/* 视图过渡核心配置 */
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

/* 锁定层级，解决回弹闪烁的关键 */
::view-transition-old(root) { z-index: 9999; }
::view-transition-new(root) { z-index: 1; }
.dark::view-transition-old(root) { z-index: 1; }
.dark::view-transition-new(root) { z-index: 9999; }

/* 修正 VitePress 默认切换按钮 */
.VPSwitchAppearance .check { transform: none !important; }
.VPSwitchAppearance .check .icon { top: -2px; }
</style>
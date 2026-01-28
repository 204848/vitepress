/* .vitepress/theme/index.ts */
import DefaultTheme from 'vitepress/theme'
import './style/index.css'
import ArticleMetadata from "./components/ArticleMetadata.vue"
import MyLayout from './components/MyLayout.vue'
import giscusTalk from 'vitepress-plugin-comment-with-giscus';
import { useData, useRoute } from 'vitepress';
import type { EnhanceAppContext } from 'vitepress' // 导入类型

export default {
  extends: DefaultTheme,
  setup() {
    const { frontmatter } = useData();
    const route = useRoute();

    giscusTalk({
      repo: '204848/vitepress',
      repoId: 'R_kgDOP9VXoQ',
      category: 'General',
      categoryId: 'DIC_kwDOP9VXoc4CwV-l',
      mapping: 'pathname',
      inputPosition: 'bottom',
      lang: 'zh-CN',
    }, { frontmatter, route }, true);
  },
  Layout: MyLayout,
  // 给参数加上类型标注
  enhanceApp({ app }: EnhanceAppContext) { 
    app.component('ArticleMetadata', ArticleMetadata)
  }
}
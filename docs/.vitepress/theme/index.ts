/* .vitepress/theme/index.ts */
import DefaultTheme from 'vitepress/theme'
import './style/index.css'
import ArticleMetadata from "./components/ArticleMetadata.vue"
import MyLayout from './components/MyLayout.vue'
import giscusTalk from 'vitepress-plugin-comment-with-giscus';
import { useData, useRoute } from 'vitepress';
import mediumZoom from 'medium-zoom';
import { onMounted, watch, nextTick } from 'vue';


export default {
  
  extends: DefaultTheme,
    setup() {
    // Get frontmatter and route
    const { frontmatter } = useData();
    const route = useRoute();
     
        const initZoom = () => {
      // mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' }); // 默认
    mediumZoom('.main img', { background: 'var(--vp-c-bg)' }); // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
    };
    onMounted(() => {
      initZoom();
    });
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    );
    
    // giscus配置
    giscusTalk({
      repo: '204848/vitepress', //仓库
      repoId: 'R_kgDOP9VXoQ', //仓库ID
      category: 'General', // 讨论分类
      categoryId: 'DIC_kwDOP9VXoc4CwV-l', //讨论分类ID
      mapping: 'pathname',
      inputPosition: 'bottom',
      lang: 'zh-CN',
      }, 
      {
        frontmatter, route
      },
      //默认值为true，表示已启用，此参数可以忽略；
      //如果为false，则表示未启用
      //您可以使用“comment:true”序言在页面上单独启用它
      true
    );
  },
  Layout: MyLayout,
enhanceApp({app}) { 
    // 注册全局组件
    app.component('ArticleMetadata' , ArticleMetadata)
  }
}
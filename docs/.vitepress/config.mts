import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  cleanUrls:true,
  lastUpdated: true,
  base: '/vitepress/',
  title: "3216的奇妙幻想站",
  description: "一个3216的秘密(秘密吗?)小基地，记载一些小东西(主要是一个幻想)，然后可能也有别的q(≧▽≦q)~~~",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '简介', link: '/introduction' }
    ],

    sidebar: [
      {
        text: '关于',
        collapsed:false,
        items: [

          { text: '关于这个项目', link: '/about' },
          { text: '简介', link: '/introduction' }
        ]
      },
      {
        text: '小幻想',
        collapsed:false,
        items: [

          { text: '起始', link: '/begin' }
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],

    darkModeSwitchLabel: '深浅模式',
        search: { 
      provider: 'local'
    },
    footer: {
      copyright: `Copyright © 2019-${new Date().getFullYear()} present Evan You`,
    },
    outline: { 
      level: [2,3], // 显示2-4级标题
      // level: 'deep', // 显示2-6级标题
      label: '当前页大纲' // 文字显示
    },
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short', // 可选值full、long、medium、short
        timeStyle: 'medium' // 可选值full、long、medium、short
      },
    }
  }
})

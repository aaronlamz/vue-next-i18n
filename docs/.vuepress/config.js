import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'

export default defineUserConfig({
    lang: 'zh-CN',
    title: 'Node.js 学习指南',
    description: '构建 Node.js 知识体系',
    base:'/vue-next-i18n/',
    head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
    theme: defaultTheme({
      displayAllHeaders:true,
      logo: '/nodejs.svg',
      navbar:  [
          { text: '首页', link: '/vue-next-i18n/' },
          { text: '仓库', link: 'https://github.com/aaronlamz/vue-next-i18n' },
      ],
      sidebar: {
          '/md/guide/': [
          {
            text: '基础入门',
            collapsible:false,
            children: [
              '/md/guide/basic/node-intro.md',
              '/md/guide/basic/basic-principle.md',
              '/md/guide/basic/module-mechanism.md',
            ],
          },
          {
            text: '系统模块',
            collapsible:false,
            children: [
              '/md/guide/system-module/globals.md',
              '/md/guide/system-module/fs.md',
              '/md/guide/system-module/buffer.md',
            ],
          },
          {
            text: '深入理解',
            path:'/md/guide/',
            collapsible:false,
            children: [
              '/md/guide/deep/asyn-io.md',
              '/md/guide/deep/memory.md',
              '/md/guide/deep/process.md',
            ],
          },
          {
            text: '调试指南',
            path:'/md/guide/',
            collapsible:false,
            children: [
              '/md/guide/debug/README.md'
            ],
          },
          {
            text: '实战指南',
            path:'/md/guide/',
            collapsible:false,
            children: [
              '/md/guide/practice/README.md'
            ],
          },
        ],
        '/md/interview/': [
          {
            text: '面试指南',
            path:'',
            collapsible:false,
            children: [
              '/md/interview/basic/README.md',
              '/md/interview/module/README.md',
              '/md/interview/event/README.md',
            ],
          },
        ]
      }
    }),
})



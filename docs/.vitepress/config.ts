import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Vue next i18n",
    description: "Lightweight internationalization plugin for Vue 3",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        logo: '/logo.svg',
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Guide', link: '/es/guide/' }
        ],
        sidebar: [
            {
                text: 'Examples',
                items: [
                    { text: 'Markdown Examples', link: '/markdown-examples' },
                    { text: 'Runtime API Examples', link: '/api-examples' }
                ]
            }
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/aaronlamz/vue-next-i18n' }
        ]
    },
    locales: {
        root: {
            label: 'English',
            lang: 'en'
        },
        zh_CN: {
            label: '简体中文',
            lang: 'zh-CN',
            link: '/zh_CN/'
        }
    },
})

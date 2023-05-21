import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Vue next i18n",
    base: '/vue-i18n-next/',
    description: "Lightweight internationalization plugin for Vue 3",
    lang : 'en',
    locales: {
        root: {
            label: 'English',
            lang: 'en',
            link: '/en/',
            themeConfig: {
                // https://vitepress.dev/reference/default-theme-config
                logo: '/logo.svg',
                nav: [
                    { text: 'Home', link: '/en/' },
                    { text: 'Guide', link: '/en/guide/' }
                ],
                sidebar: [
                    {
                        text: 'Introduction',
                        items: [
                            { text: 'Guide', link: '/en/guide/' },
                        ]
                    }
                ],

                socialLinks: [
                    { icon: 'github', link: 'https://github.com/aaronlamz/vue-next-i18n' }
                ]
            },
        },
        zh_CN: {
            label: '简体中文',
            lang: 'zh-CN',
            link: '/zh_CN/',
            themeConfig: {
                // https://vitepress.dev/reference/default-theme-config
                logo: '/logo.svg',
                nav: [
                    { text: '首页', link: '/zh_CN/' },
                    { text: '指南', link: '/zh_CN/guide/' }
                ],
                sidebar: [
                    {
                        text: '介绍',
                        items: [
                            { text: '指南', link: '/zh_CN/guide/' },
                        ]
                    }
                ],

                socialLinks: [
                    { icon: 'github', link: 'https://github.com/aaronlamz/vue-next-i18n' }
                ]
            },

        }
    },
})

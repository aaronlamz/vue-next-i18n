import { createApp } from 'vue'
import App from './App.vue'
import { createI18n } from '../../../src'

const i18n = createI18n({
    locale: 'zhCHS',
    messages: {
        en: {
            global:'global option',
            button: {
                add: 'Add new'
            },
        },
        zhCHS: {
            global:'全局 选项',
            button: {
                add: '新增'
            },
        },
         zhCHT: {
            global:'繁体 全局 选项',
            button: {
                add: '繁体 新增'
            },
        }
    }
})
createApp(App).use(i18n).mount('#app')

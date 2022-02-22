import { createApp } from 'vue'
import App from './App.vue'
import { createI18n } from '../../../src/index'

const i18n = createI18n({
    locale: 'zhCHS',
    messages: {
        en: {
            fromMapTips:'fromMapTips',
            global:'global option',
            button: {
                add: 'Add new'
            },
        },
        zhCHS: {
            fromMapTips:'fromMapTips提示',
            global:'全局 选项',
            button: {
                add: '新增'
            },
        },
         zhCHT: {
            fromMapTips:'fromMapTips提示',
            global:'繁体 全局 选项',
            button: {
                add: '繁体 新增'
            },
        }
    }
})
createApp(App).use(i18n).mount('#app')

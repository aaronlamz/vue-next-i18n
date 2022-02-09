import { createApp } from 'vue'
import App from './App.vue'
import { createI18n } from '../../../src'

const i18n = createI18n({
    locale: 'zhCHS',
    messages: {
        en: {
            button: {
                add: 'Add new'
            },
        },
        zhCHS: {
            button: {
                add: '新增'
            },
        }
    }
})
createApp(App).use(i18n).mount('#app')

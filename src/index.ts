import { App, ref, reactive, readonly, toRaw } from 'vue'
import { I18nOptions, I18nInstance, Locales } from './types'
import { getMessage, mergeDeep } from './utils'

export function createI18n(options?: I18nOptions): I18nInstance {
    const initOptions = Object.assign(
        {
            locale: 'en',
            messages: {},
            localeKeys: ['zhCHS', 'zhCHT', 'en']
        },
        options
    )
    const currentLocale = ref(initOptions.locale)
    let locales: Locales = reactive({})
    Object.entries(initOptions.messages).forEach(([key, messages]) => {
        locales[key] = messages
    })

    return {
        currentLocale: readonly(currentLocale),
        t(key: string, ...args: any): string {
            if (!key) return ''
            const locale = currentLocale.value

            let message: any
            if (Array.isArray(key)) {
                const messages = key
                const index = initOptions.localeKeys.findIndex(
                    key => key === locale
                )
                message = messages[index]
            } else {
                message = getMessage(locales[locale], key)
            }
            if (typeof message === 'function') {
                return message(...args) || key
            }
            return message || key
        },
        changeLocale(locale: string) {
            currentLocale.value = locale
        },
        addLocales(messages: Locales) {
            locales = mergeDeep(toRaw(locales) || {}, messages)
        },
        install(app: App) {
            const ctx = this
            app.config.globalProperties.$t = ctx.t
            app.mixin({
                beforeCreate() {
                    this.$options.i18n && ctx.addLocales(this.$options.i18n)
                }
            })
        }
    }
}

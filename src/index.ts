import { App, ref, readonly, toRaw, reactive } from 'vue'
import { I18nOptions, I18nInstance, Locales } from './types'
import { getMessage, mergeDeep } from './utils'
import { I18nInjectionKey } from './injectionSymbol'

let $t: any
let locales: Locales = reactive({})
const currentLocale = ref('')

export function createI18n(options?: I18nOptions): I18nInstance {
    const initOptions = Object.assign(
        {
            locale: 'en',
            messages: {},
            localeKeys: ['zhCHS', 'zhCHT', 'en']
        },
        options
    )
    currentLocale.value = initOptions.locale
    locales = initOptions.messages
    return {
        currentLocale: readonly(currentLocale),
        t(key: string | string[], ...args: any[]): string {
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
            if (args.length && message) {
                args.forEach((value: string | number, index: number) => {
                    const regexp = new RegExp(`\\$${index + 1}`, 'gi')
                    message = message.replace(regexp, value)
                })
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
            app.config.globalProperties.$i18n = ctx
            app.config.globalProperties.$t = ctx.t
            $t = ctx.t
            app.mixin({
                beforeCreate() {
                    this.$options.i18n && ctx.addLocales(this.$options.i18n)
                }
            })
            app.provide(I18nInjectionKey, ctx)
        }
    }
}
export * from './useApi'
export * from './types'
export { $t }

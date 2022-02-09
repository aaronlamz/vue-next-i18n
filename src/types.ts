import { App, Ref } from 'vue'
import { UnwrapNestedRefs } from '@vue/reactivity'

export type I18nOptions = {
    locale?: string
    messages?: {
        [locale: string]: LocaleMessages
    }
    localeKeys?: Array<string>
}

export type LocaleMessage = string

export type LocaleMessageObject = {
    [key: string]: LocaleMessageObject | LocaleMessage
}

export type LocaleMessages = {
    [key: string]: LocaleMessageObject | LocaleMessage
}

export type Locales = UnwrapNestedRefs<{
    [key: string]: LocaleMessages
}>

export type I18nInstance = {
    currentLocale: UnwrapNestedRefs<Ref<string>>
    options: UnwrapNestedRefs<I18nOptions>
    changeLocale(locale: string): void
    addLocales(messages: Locales): void
    t(key: string, options?: unknown): string
    install(app: App): void
}

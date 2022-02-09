import { App, Ref } from 'vue'
import { UnwrapNestedRefs, DeepReadonly } from '@vue/reactivity'

export type I18nOptions = {
    locale?: string
    messages?: {
        [locale: string]: LocaleMessages
    }
    localeKeys?: string[]
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
    currentLocale: DeepReadonly<UnwrapNestedRefs<Ref<string>>>
    changeLocale(locale: string): void
    addLocales(messages: Locales): void
    t(key: string, options?: any): string
    install(app: App): void
}

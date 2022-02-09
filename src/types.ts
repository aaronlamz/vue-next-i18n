import { App } from 'vue'

export type I18nOptions = {
    locale?: string
    messages?: {
        [locale: string]: LocaleMessages
    }
}

export type I18nInstance = {
    install(app: App): void
}

export type LocaleMessages = {
    [key: string]: LocaleMessageObject | LocaleMessage
}

export type LocaleMessageObject = {
    [key: string]: LocaleMessageObject | LocaleMessage
}

export type LocaleMessage = string

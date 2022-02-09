import { App, ref, reactive, readonly, toRaw } from 'vue'
import { I18nOptions, I18nInstance } from './types'

export function createI18n(options: I18nOptions): I18nInstance {
    console.log(options)
}

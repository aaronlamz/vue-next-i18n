import { inject } from 'vue'
import { I18nInjectionKey } from './injectionSymbol'
import { I18nInstance } from './types'

export function useI18n(): I18nInstance {
    const i18n = inject(I18nInjectionKey)
    return i18n as I18nInstance
}

import { inject } from 'vue'
import { I18nInjectionKey } from './injectionSymbol'
import { I18nInstance } from './types'

export function useI18n(): I18nInstance {
    return inject(I18nInjectionKey)
}

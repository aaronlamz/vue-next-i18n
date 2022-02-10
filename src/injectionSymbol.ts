import { InjectionKey } from 'vue'
import { I18nInstance } from './types'

const hasSymbol =
    typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol'

export const makeSymbol = (name: string): symbol | string =>
    hasSymbol ? Symbol(name) : name

export const I18nInjectionKey: InjectionKey<I18nInstance> | string =
    /* #__PURE__*/ makeSymbol('i18n')

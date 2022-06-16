import { createI18n } from '../src'
import { I18nInstance } from '../src'

const defaultMessages = {
    en: {
        home: {
            general: {
                button: 'Home'
            }
        }
    }
}

describe('I18n plugin tests', () => {
    describe('Init', () => {
        it('create plugin', () => {
            const plugin = createI18n()
            expect(plugin.currentLocale).toEqual('en')
        })

        it('create plugin with options', () => {
            const plugin = createI18n({
                locale: 'ja'
            })
            expect(plugin.currentLocale).toEqual('ja')
        })
    })

    describe('Plugin', () => {
        let plugin: I18nInstance
        beforeEach(() => {
            plugin = createI18n({
                locale: 'en',
                messages: defaultMessages
            })
        })

        it('message', () => {
            expect(plugin.t('home.general.button')).toEqual('Home')
        })

        it('extend and override message', () => {
            const messages = {
                en: {
                    home: {
                        general: {
                            button: 'Add to cart',
                            cancel: 'Cancel'
                        }
                    }
                }
            }

            plugin.addLocales(messages)
            expect(plugin.t('home.general.button')).toEqual(
                messages.en.home.general.button
            )
            expect(plugin.t('home.general.cancel')).toEqual(
                messages.en.home.general.cancel
            )
        })
    })
})

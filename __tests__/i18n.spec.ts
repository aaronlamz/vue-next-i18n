import { createI18n } from '../src'
import { I18nInstance } from '../src'

const defaultMessages = {
    en: {
        message: {
            hello: 'hello world'
        }
    },
    zhCHS: {
        message: {
            hello: '你好 世界'
        }
    },
    ja: {
        message: {
            hello: 'こんにちは、世界'
        }
    }
}

describe('I18n plugin tests', () => {
    describe('Init Plugin', () => {
        it('create plugin without options', () => {
            const plugin = createI18n()
            expect(plugin.currentLocale.value).toEqual('en')
        })

        it('create plugin with locale option', () => {
            const plugin = createI18n({
                locale: 'ja'
            })
            expect(plugin.currentLocale.value).toEqual('ja')
        })
    })

    describe('Test plugin message and methods', () => {
        let plugin: I18nInstance
        beforeEach(() => {
            plugin = createI18n({
                locale: 'en',
                messages: defaultMessages
            })
        })

        it('message', () => {
            expect(plugin.t('message.hello')).toEqual('hello world')
        })

        it('extend and override message', () => {
            const messages = {
                en: {
                    message: {
                        hello: 'override hello world message'
                    }
                }
            }
            plugin.addLocales(messages)
            expect(plugin.t('message.hello')).toEqual(messages.en.message.hello)
        })

        it('change locale', () => {
            plugin.changeLocale('zhCHS')
            expect(plugin.t('message.hello')).toEqual('你好 世界')
        })

        it('change locale to default', () => {
            plugin.changeLocale('en')
            expect(plugin.t('message.hello')).toEqual('hello world')
        })

        it('change locale to default and extend', () => {
            plugin.changeLocale('en')
            const messages = {
                en: {
                    message: {
                        hello: 'override hello world message'
                    }
                }
            }
            plugin.addLocales(messages)
            expect(plugin.t('message.hello')).toEqual(messages.en.message.hello)
        })
    })
})

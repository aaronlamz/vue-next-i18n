import { createI18n } from '../src'
import { I18nInstance } from '../src'

const defaultMessages = {
    en: {
        message: {
            hello: 'hello world',
            param: (val: string) => `hello ${val}`
        }
    },
    zhCHS: {
        message: {
            hello: '你好 世界',
            param: (val: string) => `你好 ${val}`
        }
    },
    ja: {
        message: {
            hello: 'こんにちは、世界',
            param: (val: string) => `こんにちは ${val}`
        }
    }
}

// const otherMessages = {
//     zhCHS: {
//         message: {
//             hello: '你好 世界',
//             param: (val: string) => `你好 ${val}`
//         }
//     },
//     zhCHT: {
//         message: {
//             hello: '你好 世界',
//             param: (val: string) => `你好 ${val}`
//         }
//     },
//     en: {
//         message: {
//             hello: 'hello world',
//             param: (val: string) => `hello ${val}`
//         }
//     }
// }

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

    describe('Test Plugin Default ', () => {
        let plugin: I18nInstance

        it('create plugin without options', () => {
            plugin = createI18n()
            expect(plugin.currentLocale.value).toEqual('en')
        })

        it('test localeKeys ', () => {
            expect(plugin.t(['你好 世界', '你好 世界', 'hello world'])).toEqual(
                'hello world'
            )
        })
    })

    describe('Test plugin message and methods', () => {
        let plugin: I18nInstance
        beforeEach(() => {
            plugin = createI18n({
                locale: 'en',
                localeKeys: ['en', 'zhCHT', 'ja'],
                messages: defaultMessages
            })
        })

        it('test message', () => {
            expect(plugin.t('message.hello')).toEqual('hello world')
        })

        it('test message function', () => {
            expect(plugin.t('message.param', 'world')).toEqual('hello world')
        })

        it('test message without key', () => {
            expect(plugin.t('')).toEqual('')
        })

        it('test localeKeys ', () => {
            expect(
                plugin.t(['hello world', '你好 世界', 'こんにちは、世界'])
            ).toEqual('hello world')
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

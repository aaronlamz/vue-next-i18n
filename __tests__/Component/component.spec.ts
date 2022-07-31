import { mount } from '@vue/test-utils'
import Component from './index.vue'
import { createApp } from 'vue'
import { createI18n } from '../../src'

describe('displays message', () => {
    let wrapper: any
    beforeEach(() => {
        const app = createApp(Component)
        const i18n = createI18n()
        app.use(i18n)
        wrapper = mount(Component)
    })
    it('test message', () => {
        expect(wrapper.text()).toContain('en')
    })
})

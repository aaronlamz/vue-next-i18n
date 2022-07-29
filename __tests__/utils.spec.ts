import { isObj, isDef, getMessage, mergeDeep } from '../src/utils'

describe('Utils tests', () => {
    it('test isObj', () => {
        expect(isObj({})).toBe(true)
        expect(isObj(null)).toBe(false)
        expect(isObj(undefined)).toBe(false)
        expect(isObj(1)).toBe(false)
        expect(isObj('string')).toBe(false)
        expect(isObj(true)).toBe(false)
        expect(isObj(false)).toBe(false)
    })

    it('test isDef', () => {
        expect(isDef(undefined)).toBe(false)
        expect(isDef(null)).toBe(false)
        expect(isDef(1)).toBe(true)
        expect(isDef('string')).toBe(true)
        expect(isDef(true)).toBe(true)
        expect(isDef(false)).toBe(true)
    })

    it('test getMessage', () => {
        expect(getMessage({}, '')).toBe('')
        expect(getMessage({}, 'a')).toBe('')
        expect(getMessage({ a: '1' }, 'a')).toBe('1')
        expect(getMessage({ a: { b: '1' } }, 'a.b')).toBe('1')
        expect(getMessage({ a: { b: '1' } }, 'a.c')).toBe('')
    })

    it('test mergeDeep', () => {
        expect(mergeDeep({ a: 1 }, { a: 2 })).toEqual({ a: 2 })
    })
})

import { isObj, isDef, getMessage, mergeDeep } from '../src/utils'

describe('isObj', () => {
    it('returns true for objects and functions', () => {
        expect(isObj({})).toBe(true)
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        expect(isObj(() => {})).toBe(true)
        expect(isObj(new Map())).toBe(true)
    })

    it('returns false for null and non-object values', () => {
        expect(isObj(null)).toBe(false)
        expect(isObj(undefined)).toBe(false)
        expect(isObj(1)).toBe(false)
        expect(isObj('string')).toBe(false)
        expect(isObj(true)).toBe(false)
        expect(isObj(false)).toBe(false)
    })
})

describe('isDef', () => {
    it('returns true for defined values', () => {
        expect(isDef(1)).toBe(true)
        expect(isDef('string')).toBe(true)
        expect(isDef(true)).toBe(true)
        expect(isDef(false)).toBe(true)
        expect(isDef([])).toBe(true)
        expect(isDef({})).toBe(true)
    })

    it('returns false for undefined and null values', () => {
        expect(isDef(undefined)).toBe(false)
        expect(isDef(null)).toBe(false)
    })
})

describe('getMessage', () => {
    const messageObject = {
        greeting: {
            en: 'Hello',
            es: 'Hola'
        }
    }
    test('returns empty string when path is empty', () => {
        expect(getMessage(messageObject, '')).toBe('')
    })

    test('returns message when path exists', () => {
        expect(getMessage(messageObject, 'greeting.en')).toBe('Hello')
        expect(getMessage(messageObject, 'greeting.es')).toBe('Hola')
    })

    test('returns empty string when path does not exist', () => {
        expect(getMessage(messageObject, 'not.exist')).toBe('')
    })
})

describe('mergeDeep', () => {
    test('merges two objects with shallow properties', () => {
        const target = { a: 1 }
        const source = { b: 2 }
        const expected = { a: 1, b: 2 }
        expect(mergeDeep(target, source)).toEqual(expected)
    })

    test('merges two objects with nested properties', () => {
        const target = { a: { b: 1 } }
        const source = { a: { c: 2 } }
        const expected = { a: { b: 1, c: 2 } }
        expect(mergeDeep(target, source)).toEqual(expected)
    })

    test('merges two objects with nested properties deeply', () => {
        const target = { a: { b: { c: 1 } } }
        const source = { a: { b: { d: 2 } } }
        const expected = { a: { b: { c: 1, d: 2 } } }
        expect(mergeDeep(target, source)).toEqual(expected)
    })

    // test('merges two objects with arrays', () => {
    //     const target = { a: [1, 2, 3] }
    //     const source = { a: [4, 5] }
    //     const expected = { a: [4, 5, 3] }
    //     expect(mergeDeep(target, source)).toEqual(expected)
    // })

    // test('returns target if source is null or undefined', () => {
    //     const target = { a: { b: 1 } }
    //     expect(mergeDeep(target, null)).toEqual(target)
    //     expect(mergeDeep(target, undefined)).toEqual(target)
    // })

    // test('returns source if target is null or undefined', () => {
    //     const source = { a: { b: 1 } }
    //     expect(mergeDeep(null, source)).toEqual(source)
    //     expect(mergeDeep(undefined, source)).toEqual(source)
    // })

    // test('returns empty object if both target and source are null or undefined', () => {
    //     expect(mergeDeep(null, null)).toEqual({})
    //     expect(mergeDeep(null, undefined)).toEqual({})
    //     expect(mergeDeep(undefined, null)).toEqual({})
    //     expect(mergeDeep(undefined, undefined)).toEqual({})
    // })

    test('does not modify target or source objects', () => {
        const target = { a: { b: 1 } }
        const source = { a: { c: 2 } }
        const result = mergeDeep(target, source)
        expect(result).not.toBe(target)
        expect(result).not.toBe(source)
    })
})

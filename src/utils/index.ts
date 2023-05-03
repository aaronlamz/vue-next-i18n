import { LocaleMessageObject } from '../types'

export function isObj(value: unknown): boolean {
    const type = typeof value
    return value !== null && (type === 'object' || type === 'function')
}

export function isDef(value: any) {
    return value !== undefined && value !== null
}

export function getMessage(
    messageObject: LocaleMessageObject,
    path: string
): any {
    const keys = path ? path.split('.') : []
    if (keys.length === 0) {
        return ''
    }
    let rawObject = Object.assign({}, messageObject) as any
    keys.forEach(key => {
        rawObject = isDef(rawObject[key]) ? rawObject[key] : ''
    })
    return rawObject
}

export function mergeDeep(
    target: Record<string, any>,
    source: Record<string, any>
): Record<string, any> {
    const result: Record<string, any> = { ...target }
    Object.keys(source).forEach(key => {
        const targetValue = target[key]
        const sourceValue = source[key]
        if (
            typeof targetValue === 'object' &&
            typeof sourceValue === 'object'
        ) {
            result[key] = mergeDeep(targetValue, sourceValue)
        } else {
            result[key] = sourceValue
        }
    })
    return result
}

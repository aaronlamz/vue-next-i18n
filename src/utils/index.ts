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
    if (!isObj(messageObject)) return ''
    const keys = path.split('.')
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
    Object.keys(source).forEach(key => {
        // merging the same key on both objects
        if (
            typeof source[key] === 'object' &&
            source[key] instanceof Object &&
            key in target
        ) {
            source[key] = {
                ...source[key],
                ...mergeDeep(target[key], source[key])
            }
        }
    })
    return { ...(target || {}), ...source }
}

import { LocaleMessageObject } from './types'

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
): string {
    if (!isObj(messageObject)) return ''
    const result = messageObject
    const keys = path.split('.')
    keys.forEach(key => {
        result = isDef(result[key]) ? result[key] : ''
    })
    return result
}

export function mergeDeep(
    target: Record<string, any>,
    source: Record<string, any>
): Record<string, any> {
    Object.keys(source).forEach(key => {
        if (source[key] instanceof Object && key in target) {
            source[key] = {
                ...source[key],
                ...mergeDeep(target[key], source[key])
            }
        }
    })
    return { ...(target || {}), ...source }
}

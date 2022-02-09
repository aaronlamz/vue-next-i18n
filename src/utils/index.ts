import { LocaleMessageObject } from '../types'

export function isObj(value: unknown): boolean {
    const type = typeof value
    return value !== null && (type === 'object' || type === 'function')
}

export function isDef(value: any) {
    return value !== undefined && value !== null
}

export function parsePath(path: string): Array<string> {
    const pathArray = path.split('.')
    const parts = []

    for (let i = 0; i < pathArray.length; i++) {
        let p = pathArray[i]

        while (p[p.length - 1] === '\\' && pathArray[i + 1] !== undefined) {
            p = p.slice(0, -1) + '.'
            p += pathArray[++i]
        }

        parts.push(p)
    }

    return parts
}

export function getMessage(
    messageObject: LocaleMessageObject,
    path: string
): any {
    if (!isObj(messageObject)) return ''
    const paths = parsePath(path)
    if (paths.length === 0) {
        return ''
    }
    let rawObject = Object.assign({}, messageObject)
    for (let i = 0; i < paths.length; i++) {
        if (typeof rawObject[paths[i]] === 'string') {
            return rawObject[paths[i]] as string
        }
        rawObject = rawObject[paths[i]] as LocaleMessageObject
        if (rawObject === undefined || rawObject === null) {
            if (i !== paths.length - 1) {
                return ''
            }
            break
        }
    }
    return ''
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

import { getTypeName, isArray, isObject } from './utils'
import pkg from '../package.json'

const createInterfaceName = (name: string, parentName: string = '', prefix: string = 'I') => {
    return `${prefix}${parentName}${name.replace(/^./, m => m.toUpperCase())}`
}

type TElement = { name: string; type: string }
type TInterface = { name: string; elements: TElement[] }

const convert = (stack: TInterface[], value: unknown, name: string = 'value', parent: string = '', nameMap: Record<string, string> = {}): string => {
    if(isObject(value)) {
        const interfaceName = createInterfaceName(name, parent)
        const elements: TElement[] = []
        Object.entries(value).forEach(([key, val]) => {
            elements.push({ name: key, type: convert(stack, val, key, interfaceName.substring(1), nameMap) })
        })
        stack.push({ name: interfaceName, elements })
        return interfaceName
    } else if(isArray(value)) {
        if(value.length > 0) {
            const t = convert(stack, value[0], name, parent, nameMap)
            return `${t}[]`
        } else {
            return `${nameMap['any'] || 'any'}[]`
        }
    } else {
        const t = getTypeName(value)
        return nameMap[t] || t
    }
}

const stringify = (stack: TInterface[], indent: string = '    ') => {
    const arr: string[] = [
        `// ${pkg.name} version ${pkg.version}`,
        `// created ${new Date()}`,
        ``,
    ]
    stack.forEach(st => {
        arr.push(`interface ${st.name} {`)
        st.elements.forEach(el => {
            arr.push(`${indent}${el.name}: ${el.type};`)
        })
        arr.push(`}`)
        arr.push(``)
    })
    return arr.join('\n')
}

export const parse = (name: string, value: unknown) => {
    const stack: TInterface[] = []
    convert(stack, value, name)
    const result = stringify(stack)
    return result
}

// const stack: TInterface[] = []
// convert(stack, { a: 1, b: { c: false }, c: [0], d: [{d:1,dd:'2',DDD:null}] }, 'cart')
// console.log(stringify(stack))
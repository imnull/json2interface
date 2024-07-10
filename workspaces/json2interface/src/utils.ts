type TDataType = 'null' | 'undefined' | 'symbol' | 'number' | 'string' | 'boolean' | 'function' | 'object' | 'array' | 'uint16array' | 'uint8array' | 'uint32array'

export const getTypeName = (v: unknown): TDataType => {
    return Object.prototype.toString.call(v).slice(8, -1).toLowerCase() as TDataType
}


export const isObject = (v: unknown): v is Record<string, unknown> => getTypeName(v) === 'object'
export const isArray = (v: unknown): v is unknown[] => getTypeName(v) === 'array'

// console.log(getTypeName(new Uint32Array()))

/* eslint-disable */
export const isArray = (data) => {
    return Object.prototype.toString.call(data) === '[object Array]'
}

export const isNumber = (data) => {
    return Object.prototype.toString.call(data) === '[object Number]'
}

export const isString = (data) => {
    return Object.prototype.toString.call(data) === '[object String]'
}

export const isBoolean = (data) => {
    return Object.prototype.toString.call(data) === '[object Boolean]'
}

export const isFunc = (data) => {
    return Object.prototype.toString.call(data) === '[object Function]'
}

export const isObject = (data) => {
    return Object.prototype.toString.call(data) === '[object Object]'
}

export const isNull = (data) => {
    return Object.prototype.toString.call(data) === '[object Null]'
}

export const arrayLen = (data) => {
    return isArray(data) ? data.length : null
}

export const objectLen = (data) => {
    return isObject(data) ? Object.keys(data).length : null
}

export const isDate = (data) => {
    return !!data && new Date(data).toString() !== 'Invalid Date'
}

export const verifyDate = (val) => {
    return isArray(val) ? isDate(val[0]) && isDate(val[1]) : isDate(val)
}

export const getLen = (val) => {
    return val ? val.length : null
}
export const getObjLen = (val) => {
    return Object.keys(val).length
}
export const getNumLen = (val) => {
    return val
}

export const getType = (val) => {
    return (val && val.constructor.name.toLowerCase()) || 'string'
}

export const typeOfS = {
    array: isArray,
    object: isObject,
    number: isNumber,
    string: isString,
    boolean: isBoolean,
    date: verifyDate
}

export const getTypeLen = {
    array: getLen,
    object: getObjLen,
    number: getNumLen,
    string: getLen,
    date: getLen
}

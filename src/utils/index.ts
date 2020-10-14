export const getQueryString = (name: string): null | string => {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    const r = window.location.search.substr(1).match(reg)
    if (r !== null) {
        return unescape(r[2])
    }
    return null
}

export const getCookie = (name: string): string => {
    var arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'))
    if (arr != null) {
        return unescape(arr[2])
    }
    return ''
}

export const getToken = (): string => {
    return getQueryString('token') || getCookie('token')
}

export const throttle = (func: Function, wait: number, assignTime: number): Function => {
    let timerId: any = ''
    let startTime: any = new Date()
    return (...arg: any[]): void => {
        const nowTime: any = new Date()
        clearTimeout(timerId)
        if (nowTime - startTime < assignTime) {
            timerId = setTimeout(() => {
                func(arg[0])
            }, wait)
            return
        }
        func(arg[0])
        startTime = nowTime
    }
}

export function debounce(func: Function, wait: number) {
    let timeout: any = null
    const context = this
    return function() {
        var args = arguments
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(function() {
            func.apply(context, args)
        }, wait)
    }
}

/** 计算一个时间与当前时间的差 */
export const getArticleDate = (timesData: string) => {
    const dateBegin = new Date(timesData)
    const dateEnd = new Date()
    const dateDiff = dateEnd.getTime() - dateBegin.getTime() // 时间差的毫秒数
    const dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)) // 计算出相差天数
    const leave1 = dateDiff % (24 * 3600 * 1000) // 计算天数后剩余的毫秒数
    const hours = Math.floor(leave1 / (3600 * 1000)) // 计算出小时数
    // 计算相差分钟数
    const leave2 = leave1 % (3600 * 1000) // 计算小时数后剩余的毫秒数
    const minutes = Math.floor(leave2 / (60 * 1000)) // 计算相差分钟数
    // 计算相差秒数
    // const leave3 = leave2 % (60 * 1000) // 计算分钟数后剩余的毫秒数
    // const seconds = Math.round(leave3 / 1000)
    let timesString = ''

    if (dayDiff !== 0) {
        timesString = `${dayDiff}天前`
    } else if (dayDiff === 0 && hours !== 0) {
        timesString = `${hours}小时前`
    } else if (dayDiff === 0 && hours === 0) {
        timesString = `${minutes}分钟前`
    }

    return timesString
}

interface getUrlParamsType {
    url: string
    key: string
}
export const getUrlParam = <T extends object>(paramsObj?: getUrlParamsType): T => {
    let { url, key } = paramsObj || {}
    if (!url) {
        url = window && window.location && window.location.href
    }
    if (!url) {
        return {} as T
    }
    const urlformat = url
    const re = /[^?#&]+=[^?#&]+/g
    const paramsarr = urlformat.match(re) || []
    const returnjson: any = {}
    paramsarr.forEach((data) => {
        const splitdata = data.split('=')
        const sp0 = splitdata && splitdata[0]
        const sp1 = splitdata && splitdata[1]
        if (sp0) {
            returnjson[sp0] = sp1
        }
    })
    if (key) {
        return (returnjson && returnjson[key]) || ''
    } else {
        return returnjson
    }
}

export const formatDateTime = (inputTime: string): string => {
    const date = new Date(inputTime)
    const y = date.getFullYear()
    let m: any = date.getMonth() + 1
    m = m < 10 ? `0${m}${m}` : m
    let d: any = date.getDate()
    d = d < 10 ? `0${d}` : d
    let h: any = date.getHours()
    h = h < 10 ? `0${h}` : h
    let minute: any = date.getMinutes()
    let second: any = date.getSeconds()
    minute = minute < 10 ? `0${minute}` : minute
    second = second < 10 ? `0${second}` : second
    return `${y}-${m}-${d} ${h}:${minute}:${second}`
}

const getImgSize = (base64url: string = ''): number => {
    // 获取图片base64大小
    const str = base64url.replace('data:image/jpeg;base64,', '')
    const strLength: number = str.length
    const fileLength = parseInt(String(strLength - (strLength / 8) * 2))
    let size = ''
    size = (fileLength / 1024).toFixed(2)
    return parseInt(size)
}

const compressImage = (base64: any): Promise<string> => {
    const image = new Image()
    let compressBase64 = ''
    image.src = base64
    return new Promise((resolve, reject) => {
        image.onload = function() {
            const width = image.width
            const height = image.height
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            canvas.width = width
            canvas.height = height
            ctx.drawImage(image, 0, 0, width, height)
            compressBase64 = canvas.toDataURL('image/jpeg', 0.6)
            resolve(compressBase64)
        }
    })
}

export const compressionImg = async (e: React.ChangeEvent<HTMLInputElement>): Promise<string> => {
    return new Promise((resolve, reject) => {
        const file = e.target.files[0]
        const fileType = file.type || 'image/png'
        if (fileType.indexOf('image') === -1) {
            reject(new Error('文件类型错误'))
            return
        }
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = async (e) => {
            const fileMaxSize = 5120
            const base64 = await compressImage(e.target.result)
            const size = getImgSize(base64) || 0
            if (size > fileMaxSize) {
                reject(new Error('文章图片过大'))
                return
            }
            resolve(base64)
        }
    })
}

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

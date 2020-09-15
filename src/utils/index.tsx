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

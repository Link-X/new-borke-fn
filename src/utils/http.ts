import axios, { AxiosRequestConfig } from 'axios'

import iToast from 'iu-toast'
import { postHttpType, getHttpType } from '@/typescript'

const apiUrl: any = {
    development: '/api',
    test: '/api',
    production: '/api'
}

const Http = axios.create({
    baseURL: apiUrl[process.env.NODE_ENV],
    withCredentials: true,
    headers: {
        'content-type': 'application/json'
    }
})

const getToken = (): string => {
    // token = 9d4264f1afb9414f867b30fd2a48478a
    const token = localStorage.getItem('token')
    return token
}

const httpError = {
    403: () => {
        iToast.fail('暂无权限')
        setTimeout(() => {
            const pathname = window.location.pathname
            if (pathname !== '/login') {
                localStorage.clear()
                location.reload()
            }
        }, 1500)
    },
    notNumber(data: any) {
        console.log(data)
        iToast.fail(data?.message || data?.errMsg || '请求错误')
    },
    init(code: string, data: any) {
        const func = this[code] ? this[code] : this.notNumber
        try {
            func(data)
        } catch (err) {
            console.log('err', err)
        }
    }
}

Http.interceptors.request.use(
    (config: AxiosRequestConfig): any => {
        config.headers.token = getToken()
        return config
    },
    async (error): Promise<any> => {
        return Promise.reject(error).catch((): void => {
            console.log('err')
        })
    }
)
Http.interceptors.response.use(
    async (response): Promise<any> => {
        const { isSkip }: any = response.config.headers
        if (isSkip) {
            return response
        }
        const res = response.data || {}
        if (Number(res.retCode) === 0 || Number(res.code) === 0 || res.result) {
            return res.data || res
        }
        httpError.init(res.code, res)
        return Promise.reject(res.data || res || {})
    },
    async (error): Promise<any> => {
        return Promise.reject(error).catch((): any => {
            iToast.fail(error?.message || error?.errMsg || '请求错误')
            throw new Error(error)
            // return []
        })
    }
)
function addParams(params: any): void {
    return params
}

function addData(data: any): void {
    return data
}

export const get: getHttpType = async (
    path: string,
    options: any = {
        params: {}
    }
) => {
    if (!options.params) {
        options.params = {}
    }
    options.params = addParams({ ...options.params })
    return Http.get(path, options)
}

export const post: postHttpType = async (
    path: string,
    data: any,
    options: any = {
        params: {}
    }
) => {
    data = addData({ ...data })
    return Http.post(path, data, options)
}

export default Http

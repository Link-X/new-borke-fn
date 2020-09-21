/* eslint-disable */

import React from 'React'
interface Query {
    [key: string]: string
}

// 获取参数
const useQuery = <T>(search: string): T => {
    let query: T = {} as T
    if (!search) {
        return {} as T
    }
    try {
        query = search
            .slice(1)
            .split('&')
            .reduce((prev: any, item) => {
                const keys = item.split('=')
                const key = keys[0]
                prev[key] = window.decodeURIComponent(keys[1])
                return prev
            }, {})
    } catch (err) {
        console.log(err)
    }
    return query
}

export default useQuery

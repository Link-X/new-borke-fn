declare namespace globalServer {
    /** 天气参数 */
    export interface weatherParamsType {
        city: string
    }

    export interface futureType {
        date: string
        direct: string
        temperature: string
        weather: string
        wid: {
            day: string
            night: string
        }
    }

    /** 天气数据 */
    export interface weaterDataType {
        error_code: number
        reason: string
        result: {
            city: string
            future: futureType[]
            realtime: {
                aqi: string
                direct: string
                humidity: string
                info: string
                power: string
                temperature: string
                wid: string
            }
        }
    }

    export interface getWeaterFuncType {
        (params: weatherParamsType): Promise<weaterDataType>
    }
}

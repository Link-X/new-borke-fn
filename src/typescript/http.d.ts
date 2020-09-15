/* eslint-disable */
import { AxiosRequestConfig } from 'axios'

export interface getHttpType {
    <T = any>(path: string, options: AxiosRequestConfig): Promise<T>
}

export interface postHttpType {
    <T = any>(path: string, data?: any, config?: AxiosRequestConfig): Promise<T>
}

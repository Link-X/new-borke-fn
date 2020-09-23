declare module 'iu-toast' {
    export interface funcType {
        (str: string): void
    }
    export interface noParamsFuncType {
        (): void
    }
    export const fail: funcType
    export const success: funcType
    export const loading: noParamsFuncType
    export const clear: noParamsFuncType
}

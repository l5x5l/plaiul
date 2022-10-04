import axios, { AxiosResponse } from "axios";

export const baseUri = "http://43.200.133.122"

// 기본 요소들
export type apiBaseResponse<T, G> = {
    code?: number,
    message?: string,
    data?: T,
    meta?: G,
    errors?: string[]
}

export function getDefaultHeader(accessToken : string) {
    return {Authorization : `Bearer ${accessToken}`}
}

export function toApiBaseResponse<T, G>(response: AxiosResponse<any, any>) {
    return {
        data: response.data.data,
        meta : response.data.meta
    } as apiBaseResponse<T, G>
}

export function toApiErrorResponse<T, G>(error: any) {
    if (error.response?.data !== undefined)
        return {
            code: error.response.data.code,
            message: error.response.data.message,
            errors: error.response.data.errors
        } as apiBaseResponse<T, undefined>
    else
        throw error
}

export type reportResult = {
    reported : boolean
}

export type deleteResult = {
    deleted : boolean
}

export type modifyResult = {
    modified : boolean
}
import axios, { AxiosResponse } from "axios";

const baseUri = "http://15.164.214.109"

// 스토리 상세 조회
export const getStory = (id: number) => axios.get(`${baseUri}/api/stories/${id}`).then(data => data.data).catch((error) => {
    console.log(error.response.data)
    if (error.response?.data !== undefined)
        return error.response.data
    else
        throw error
})

// 스토리 리스트 조회
export const getStoryList = (sort: string, cursor?: string) => axios.get(`${baseUri}/api/stories`, { params: { sort: sort, cursor: cursor }, headers: {} }).then(data => {
    return data.data
}).catch((error) => {
    if (error.response?.data !== undefined)
        return error.response.data
    else
        throw error
})

// qna 리스트 조회
export const getQnaList = (sort: string, cursor?: string) => axios.get(`${baseUri}/api/stories`, { params: { sort: sort, cursor: cursor }, headers: {} }).catch((error) => {
    if (error.response?.data !== undefined)
        return error.response.data
    else
        throw error
})



// 기본 요소들
export type apiBaseResponse<T, G> = {
    code?: number,
    message?: string,
    erros?: string,
    data?: T,
    meta?: G,
    errors?: string[]
}

export function toApiBaseResponse<T, G>(response: AxiosResponse<any, any>) {
    return {
        data: response.data.data
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
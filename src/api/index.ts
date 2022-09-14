import axios, { AxiosError } from "axios";

const baseUri = "http://15.164.214.109"

const errorCode = [1000, 1100, 1101, 1102, 1103, 1104, 1200, 2100, 2101, 2102, 2103, 2104, 3000, 3001, 3002, 3003, 3110, 3111, 4000]

export const getStory = (id : number) => axios.get(`${baseUri}/api/stories/${id}`).then(data => data.data).catch((error) => {
    console.log (error.response.data)
    if (error.response?.data !== undefined)
        return error.response.data
    else
        throw error
})

export const getStoryList = (sort : string, cursor ?: string) => axios.get(`${baseUri}/api/stories`, {params:{sort : sort, cursor : cursor}, headers:{}}).then(data => {
    return data.data
}).catch((error) => {
    if (error.response?.data !== undefined)
        return error.response.data
    else 
        throw error
})

export const getQnaList = (sort : string, cursor ?: string) => axios.get(`${baseUri}/api/stories`, {params:{sort : sort, cursor : cursor}, headers:{}}).catch((error) => {
    if (error.response?.data !== undefined)
        return error.response.data
    else 
        throw error
})

export type apiBaseResponse<T, G> = {
    code ?: number,
    message ?: string,
    erros ?: string,
    data : T,
    meta : G
}
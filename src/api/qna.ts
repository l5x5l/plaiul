import axios from "axios"
import { toApiBaseResponse, toApiErrorResponse } from "."
import { QnaDto } from "../type/DTO/qnaDto"
import { getAccessToken } from "../util/token"

const baseUri = "http://15.164.214.109"

// qna 리스트 조회
export const getQnaList = (sort: string, cursor?: string) => axios.get(`${baseUri}/api/qna`, { params: { sort: sort, cursor: cursor }, headers: {} }).then(data => data.data).catch((error) => {
    if (error.response?.data !== undefined)
        return error.response.data
    else
        throw error
})

// qna 상세 조회
export const getQna = async (id : number) => {
    try {
        const accessToken = await getAccessToken()
        const data = await axios.get(`${baseUri}/api/qna/${id}`, {headers : accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined})
        return toApiBaseResponse<QnaDto, undefined>(data)
    } catch (error) {
        return toApiErrorResponse<QnaDto, undefined>(error)
    }
}
import axios from "axios"
import { toApiBaseResponse, toApiErrorResponse } from "."
import { CommentDto } from "../type/DTO/commentDto"
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

// qna 댓글 조회
export type getQnaCommentListResultMeta = {
    nextCursor? : string
}

export const getQnaCommentList = async(qnaIdx : number, nextCursor ?: String) => {
    try {
        const accessToken = await getAccessToken()
        const response = await axios.get(`${baseUri}/api/qna/${qnaIdx}/comments`, { params: { cursor: nextCursor }, headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined })
        return toApiBaseResponse<CommentDto[], getQnaCommentListResultMeta>(response)
    } catch (error) {
        return toApiErrorResponse<CommentDto[], getQnaCommentListResultMeta>(error)
    } 
}

// qna 댓글 작성
export type postQnaCommentResult = {
    commentIdx : number
}

export const postWriteQnaComment = async (content : String, qnaIdx : Number, parentCommentIdx ?: Number) => {
    try {
        const accessToken = await getAccessToken()
        const response = await axios.post(`${baseUri}/api/qna/${qnaIdx}/comments`, {parentCommentIdx : parentCommentIdx, content : content}, {headers : {Authorization: `Bearer ${accessToken}`}})
        return toApiBaseResponse<postQnaCommentResult, undefined>(response)
    } catch (error) {
        return toApiErrorResponse<postQnaCommentResult, undefined>(error)
    }
}
import axios from "axios"
import { reportResult, toApiBaseResponse, toApiErrorResponse } from "."
import { CommentDto } from "../type/DTO/commentDto"
import { QnaDto } from "../type/DTO/qnaDto"
import { getAccessToken } from "../util/token"
import { patchToggleLikeResult } from "./stories"

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

// qna 작성
export type postWriteQnaResult = {
    qnaIdx : number
}

export const postWriteQna = async (title : string, content : string) => {
    try {
        const accessToken = await getAccessToken()
        const response = await axios.post(`${baseUri}/api/qna`, {title : title, content : content},  {headers : {Authorization: `Bearer ${accessToken}`}})
        return toApiBaseResponse<postWriteQnaResult, undefined>(response)
    } catch(error) {
        return toApiErrorResponse<postWriteQnaResult, undefined>(error)
    }
}

// qna 수정
export type patchModifyQnaResult = {
    modified : boolean
}

export const patchModifyQna = async (title : string, content : string, qnaIdx : number) => {
    try {
        const accessToken = await getAccessToken()
        const response = await axios.patch(`${baseUri}/api/qna/${qnaIdx}`, {title : title, content : content}, {headers : { Authorization : `Bearer ${accessToken}`}})
        return toApiBaseResponse<patchModifyQnaResult, undefined>(response)
    } catch(error) {
        return toApiErrorResponse<patchModifyQnaResult, undefined>(error)
    }
}

// qna 삭제
export type deleteQnaResult = {
    deleted : boolean
}

export const deleteQna = async(qnaIdx : number) => {
    try {
        const accessToken = await getAccessToken()
        const response = await axios.delete(`${baseUri}/api/qna/${qnaIdx}`, {headers : {Authorization : `Bearer ${accessToken}`}})
        return toApiBaseResponse<deleteQnaResult, undefined>(response)
    } catch (error) {
        return toApiErrorResponse<deleteQnaResult, undefined>(error)
    }
}


// 좋아요 변경
export const patchToggleQnaLike = async (qnaIdx: number) => {
    try {
        const accessToken = await getAccessToken()
        const response = await axios.patch(`${baseUri}/api/qna/${qnaIdx}/like`, {}, { headers: { Authorization: `Bearer ${accessToken}` } });
        return toApiBaseResponse<patchToggleLikeResult, undefined>(response);
    } catch (error) {
        return toApiErrorResponse<patchToggleLikeResult, undefined>(error);
    }
}

// qna 댓글 신고
export const reportQnaComment = async (qnaIdx : number, commentIdx : number, reasonIdx : number, reason ?: string) => {
    try {
        const accessToken = await getAccessToken()
        const response = await axios.post(`${baseUri}/api/qna/${qnaIdx}/comments/${commentIdx}/report`, { reasonIdx : reasonIdx, reason : reason }, {headers : {Authorization : `Bearer ${accessToken}`}})
        return toApiBaseResponse<reportResult, undefined>(response)
    } catch (error) {
        return toApiErrorResponse<reportResult, undefined>(error)
    }
}

// qna 신고
export const reportQna = async(qnaIdx : number, reasonIdx : number, reason ?: string) => {
    try {
        const accessToken = await getAccessToken()
        const response = await axios.post(`${baseUri}/api/qna/${qnaIdx}/report`, { reasonIdx : reasonIdx, reason : reason }, {headers : {Authorization : `Bearer ${accessToken}`}})
        return toApiBaseResponse<reportResult, undefined>(response)
    } catch (error : any) {
        return toApiErrorResponse<reportResult, undefined>(error)
    }
}
import axios from "axios";
import { toApiBaseResponse, toApiErrorResponse } from ".";
import { CommentDto } from "../type/DTO/commentDto";
import { QnaDto } from "../type/DTO/qnaDto";
import { StoryDto } from "../type/DTO/storyDto";
import { getAccessToken } from "../util/token";

const baseUri = "http://15.164.214.109"

// 스토리 상세 조회
export const getStory = async (id: number) => {
    try {
        const accessToken = await getAccessToken()
        const data = await axios.get(`${baseUri}/api/stories/${id}`, {headers :  accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined});
        return toApiBaseResponse<StoryDto, undefined>(data)
    } catch (error : any) {
        console.log(error.response.data);
        return toApiErrorResponse(error)
    }
}

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

// 좋아요 변경
export type patchToggleLikeResult = {
    isLiked: boolean
}

export const patchToggleLike = async (storyIdx: number) => {
    try {
        const accessToken = await getAccessToken()
        console.log(accessToken)
        const response = await axios.patch(`${baseUri}/api/stories/${storyIdx}/like`, {}, { headers: { Authorization: `Bearer ${accessToken}` } });
        //console.log(JSON.stringify(toApiBaseResponse<patchToggleLikeResult, undefined>(response)))
        return toApiBaseResponse<patchToggleLikeResult, undefined>(response);
    } catch (error) {
        //console.log(JSON.stringify(error))
        return toApiErrorResponse<patchToggleLikeResult, undefined>(error);
    }
}

// 스토리 댓글 조회
export type getStoryCommentListResultMeta = {
    nextCursor? : string
}

export const getStoryCommentList = async(storyIdx : number, nextCursor ?: String) => {
    try {
        const accessToken = await getAccessToken()
        const response = await axios.get(`${baseUri}/api/stories/${storyIdx}/comments`, { params: { cursor: nextCursor }, headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined })
        return toApiBaseResponse<CommentDto[], getStoryCommentListResultMeta>(response)
    } catch (error) {
        return toApiErrorResponse<CommentDto[], getStoryCommentListResultMeta>(error)
    } 
}

// 스토리 댓글 작성
export type postStoryCommentResult = {
    commentIdx : number
}

export const postWriteStoryComment = async (content : String, storyIdx : Number, parentCommentIdx ?: Number) => {
    try {
        const accessToken = await getAccessToken()
        const response = await axios.post(`${baseUri}/api/stories/${storyIdx}/comments`, {parentCommentIdx : parentCommentIdx, content : content}, {headers : {Authorization: `Bearer ${accessToken}`}})
        console.log(JSON.stringify(response))
        return toApiBaseResponse<postStoryCommentResult, undefined>(response)
    } catch (error) {
        return toApiErrorResponse<postStoryCommentResult, undefined>(error)
    }
}
// 스토리 작성
export type postWriteStoryResult = {
    storyIdx : number
}

export const postWriteStory = async (body : FormData) => {
    try {
        const accessToken = await getAccessToken()
        const response = await axios.post(`${baseUri}/api/stories`, body, {headers : {"content-type" : "multipart/form-data",  Authorization : `Bearer ${accessToken}`}})
        return toApiBaseResponse<postWriteStoryResult, undefined>(response)
    } catch (error) {
        return toApiErrorResponse<postWriteStoryResult, undefined>(error)
    }
}

// 스토리 수정
export type patchModifyStoryResult = {
    modified : boolean
}

export const patchModifyStory = async (body : FormData, storyIdx : number) => {
    try {
        const accessToken = await getAccessToken()
        const response = await axios.patch(`${baseUri}/api/stories/${storyIdx}`, body, {headers : {"content-type" : "multipart/form-data",  Authorization : `Bearer ${accessToken}`}})
        return toApiBaseResponse<patchModifyStoryResult, undefined>(response)
    } catch (error) {
        return toApiErrorResponse<patchModifyStoryResult, undefined>(error)
    }
}

// 스토리 삭제
export type deleteStoryResult = {
    deleted : boolean
}

export const deleteStory = async (storyIdx : number) => {
    try {
        const accessToken = await getAccessToken()
        const response = await axios.delete(`${baseUri}/api/stories/${storyIdx}`,  {headers : {Authorization : `Bearer ${accessToken}`}})
        return toApiBaseResponse<deleteStoryResult, undefined>(response)
    } catch (error) {
        return toApiErrorResponse<deleteStoryResult, undefined>(error)
    }
}
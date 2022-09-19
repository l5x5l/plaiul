import axios from "axios";
import { toApiBaseResponse, toApiErrorResponse } from ".";
import { CommentDto } from "../type/DTO/commentDto";
import { getAccessToken } from "../util/token";

const baseUri = "http://15.164.214.109"

// 스토리 상세 조회
export const getStory = async (id: number) => {
    try {
        const accessToken = await getAccessToken()
        const data = await axios.get(`${baseUri}/api/stories/${id}`, {headers : {Authorization: `Bearer ${accessToken}`}});
        return data.data;
    } catch (error : any) {
        console.log(error.response.data);
        if (error.response?.data !== undefined)
            return error.response.data;

        else
            throw error;
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
export const getQnaList = (sort: string, cursor?: string) => axios.get(`${baseUri}/api/stories`, { params: { sort: sort, cursor: cursor }, headers: {} }).catch((error) => {
    if (error.response?.data !== undefined)
        return error.response.data
    else
        throw error
})

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
        const response = await axios.get(`${baseUri}/api/stories/${storyIdx}/comments`, { params: { cursor: nextCursor }, headers: { Authorization: `Bearer ${accessToken}` } })
        return toApiBaseResponse<CommentDto[], getStoryCommentListResultMeta>(response)
    } catch (error) {
        return toApiErrorResponse<CommentDto[], undefined>(error)
    } 
}
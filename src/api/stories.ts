import axios from "axios";
import { baseUri, deleteResult, pagingMeta, reportResult, toApiBaseResponse, toApiErrorResponse } from ".";
import { CommentDto } from "../type/DTO/commentDto";
import { PostDto } from "../type/DTO/postDto";
import { StoryDto } from "../type/DTO/storyDto";
import { getAccessToken } from "../util/token";

// 스토리 상세 조회
export const getStory = async (id: number) => {
    try {
        const accessToken = await getAccessToken()
        const data = await axios.get(`${baseUri}/api/stories/${id}`, { headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined });
        return toApiBaseResponse<StoryDto, undefined>(data)
    } catch (error: any) {
        return toApiErrorResponse(error)
    }
}

// 스토리 리스트 조회
export const getStoryList =  async (sort: string, cursor?: string) => {
    try {
        const accessToken = await getAccessToken()
        const response = await axios.get(`${baseUri}/api/stories`, { params: { sort: sort, cursor: cursor }, headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined })
        return toApiBaseResponse<PostDto[], pagingMeta>(response)
    } catch (error) {
        return toApiErrorResponse<PostDto[], pagingMeta>(error)
    }
}

// 좋아요 변경
export type patchToggleLikeResult = {
    isLiked: boolean
}

export const patchToggleLike = async (storyIdx: number) => {
    try {
        const accessToken = await getAccessToken()
        const response = await axios.patch(`${baseUri}/api/stories/${storyIdx}/like`, {}, { headers: { Authorization: `Bearer ${accessToken}` } });
        return toApiBaseResponse<patchToggleLikeResult, undefined>(response);
    } catch (error) {
        return toApiErrorResponse<patchToggleLikeResult, undefined>(error);
    }
}

// 스토리 댓글 조회
export type getStoryCommentListResultMeta = {
    nextCursor?: string
}

export const getStoryCommentList = async (storyIdx: number, nextCursor?: String) => {
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
    commentIdx: number
}

export const postWriteStoryComment = async (content: String, storyIdx: Number, parentCommentIdx?: Number) => {
    try {
        const accessToken = await getAccessToken()
        const response = await axios.post(`${baseUri}/api/stories/${storyIdx}/comments`, { parentCommentIdx: parentCommentIdx, content: content }, { headers: { Authorization: `Bearer ${accessToken}` } })
        return toApiBaseResponse<postStoryCommentResult, undefined>(response)
    } catch (error) {
        return toApiErrorResponse<postStoryCommentResult, undefined>(error)
    }
}
// 스토리 작성
export type postWriteStoryResult = {
    storyIdx: number
}

export const postWriteStory = async (body: FormData) => {
    try {
        const accessToken = await getAccessToken()
        const response = await axios.post(`${baseUri}/api/stories`, body, { headers: { "content-type": "multipart/form-data", Authorization: `Bearer ${accessToken}` } })
        return toApiBaseResponse<postWriteStoryResult, undefined>(response)
    } catch (error) {
        return toApiErrorResponse<postWriteStoryResult, undefined>(error)
    }
}

// 스토리 수정
export type patchModifyStoryResult = {
    modified: boolean
}

export const patchModifyStory = async (body: FormData, storyIdx: number) => {
    try {
        const accessToken = await getAccessToken()
        const response = await axios.patch(`${baseUri}/api/stories/${storyIdx}`, body, { headers: { "content-type": "multipart/form-data", Authorization: `Bearer ${accessToken}` } })
        return toApiBaseResponse<patchModifyStoryResult, undefined>(response)
    } catch (error) {
        return toApiErrorResponse<patchModifyStoryResult, undefined>(error)
    }
}

// 스토리 삭제
export type deleteStoryResult = {
    deleted: boolean
}

export const deleteStory = async (storyIdx: number) => {
    try {
        const accessToken = await getAccessToken()
        const response = await axios.delete(`${baseUri}/api/stories/${storyIdx}`, { headers: { Authorization: `Bearer ${accessToken}` } })
        return toApiBaseResponse<deleteStoryResult, undefined>(response)
    } catch (error) {
        return toApiErrorResponse<deleteStoryResult, undefined>(error)
    }
}

// 스토리 댓글 신고
export const reportStoryComment = async (storyIdx: number, commentIdx: number, reasonIdx: number, reason?: string) => {
    try {
        const accessToken = await getAccessToken()
        const response = await axios.post(`${baseUri}/api/stories/${storyIdx}/comments/${commentIdx}/report`, { reasonIdx: reasonIdx, reason: reason }, { headers: { Authorization: `Bearer ${accessToken}` } })
        return toApiBaseResponse<reportResult, undefined>(response)
    } catch (error) {
        return toApiErrorResponse<reportResult, undefined>(error)
    }
}

// 스토리 신고
export const reportStory = async (storyIdx: number, reasonIdx: number, reason?: string) => {
    try {
        const accessToken = await getAccessToken()
        const response = await axios.post(`${baseUri}/api/stories/${storyIdx}/report`, { reasonIdx: reasonIdx, reason: reason }, { headers: { Authorization: `Bearer ${accessToken}` } })
        return toApiBaseResponse<reportResult, undefined>(response)
    } catch (error) {
        return toApiErrorResponse<reportResult, undefined>(error)
    }
}

// 스토리 댓글 삭제
export const deleteStoryComment = async (storyIdx: number, commentIdx: number) => {
    try {
        const accessToken = await getAccessToken()
        const response = await axios.delete(`${baseUri}/api/stories/${storyIdx}/comments/${commentIdx}`, { headers: { Authorization: `Bearer ${accessToken}` } })
        return toApiBaseResponse<deleteResult, undefined>(response)
    } catch (error) {
        return toApiErrorResponse<deleteResult, undefined>(error)
    }
}
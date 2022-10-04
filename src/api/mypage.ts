import axios from "axios"
import { baseUri, getDefaultHeader, pagingMeta, toApiBaseResponse, toApiErrorResponse } from "."
import { postCategory } from "../type/data/postCategory"
import { PostDto } from "../type/DTO/postDto"
import { TipDto } from "../type/DTO/tipDto"
import { UserDto } from "../type/DTO/userDto"
import { getAccessToken } from "../util/token"

const mypageBaseUri = baseUri + "/api/my-page"

export const getMyPage = async () => {
    try {
        const accessToken = await getAccessToken()
        const response = await axios.get(`${mypageBaseUri}`, {params : {}, headers : accessToken ? getDefaultHeader(accessToken) : undefined})
        return toApiBaseResponse<UserDto, undefined>(response)
    } catch (error) {
        return toApiErrorResponse<UserDto, undefined>(error)
    }
}

export const getMyPost = async(category : postCategory, cursor ?: string) => {
    try {
        const accessToken = await getAccessToken()
        const response = await axios.get(`${mypageBaseUri}/community`, {params : {type : category, cursor : cursor}, headers : accessToken ? getDefaultHeader(accessToken) : undefined})
        return toApiBaseResponse<PostDto[], pagingMeta>(response)
    } catch (error) {
        return toApiErrorResponse<PostDto[], pagingMeta>(error)
    }
}


export const getLikePost = async(category : postCategory, cursor ?: string) => {
    try {
        const accessToken = await getAccessToken()
        const response = await axios.get(`${mypageBaseUri}/liked/community`, {params : {type : category, cursor : cursor}, headers : accessToken ? getDefaultHeader(accessToken) : undefined})
        return toApiBaseResponse<PostDto[], pagingMeta>(response)
    } catch (error) {
        return toApiErrorResponse<PostDto[], pagingMeta>(error)
    }
}

export const getMyTip = async(cursor ?: string) => {
    try {
        const accessToken = await getAccessToken()
        const response = await axios.get(`${mypageBaseUri}/tips`, {params : {cursor : cursor}, headers : accessToken ? getDefaultHeader(accessToken) : undefined})
        return toApiBaseResponse<TipDto[], pagingMeta>(response)
    } catch (error) {
        return toApiErrorResponse<TipDto[], pagingMeta>(error)
    }
}

export const getLikeTip = async(cursor ?: string) => {
    try {
        const accessToken = await getAccessToken()
        const response = await axios.get(`${mypageBaseUri}/liked/tips`, {params : {cursor : cursor}, headers : accessToken ? getDefaultHeader(accessToken) : undefined})
        return toApiBaseResponse<TipDto[], pagingMeta>(response)
    } catch (error) {
        return toApiErrorResponse<TipDto[], pagingMeta>(error)
    }
}

export const getMyCommentPost = async(category : postCategory, cursor ?: string) => {
    try {
        const accessToken = await getAccessToken()
        const response = await axios.get(`${mypageBaseUri}/community/comments`, {params : {type : category, cursor : cursor}, headers : accessToken ? getDefaultHeader(accessToken) : undefined})
        return toApiBaseResponse<PostDto[], pagingMeta>(response)
    } catch (error) {
        return toApiErrorResponse<PostDto[], pagingMeta>(error)
    }
}
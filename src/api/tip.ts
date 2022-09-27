import axios from "axios"
import { toApiBaseResponse, toApiErrorResponse } from "."
import { TipDeatilDto, TipDto } from "../type/DTO/tipDto"
import { getAccessToken } from "../util/token"
import { patchToggleLikeResult } from "./stories"

const baseUri = "http://15.164.214.109/api/tips"

// best tip 조회
export const getBestTip = async () => {
    try {
        const respose = await axios.get(`${baseUri}/best`)
        return toApiBaseResponse<TipDto[], undefined>(respose)
    } catch (error) {
        return toApiErrorResponse<TipDto[], undefined>(error)
    }
}

// tip 전체 조회
export type getTipResultMeta = {
    nextCursor?: string
}

export const getTip = async (nextCursor?: string) => {
    try {
        const response = await axios.get(`${baseUri}`, { params: { cursor: nextCursor }})
        return toApiBaseResponse<TipDto[], getTipResultMeta>(response)
    } catch (error) {
        return toApiErrorResponse<TipDto[], getTipResultMeta>(error)
    }
}

// tip 상세 조회
export const getTipDetail = async (tipIdx : number) => {
    try { 
        const accessToken = await getAccessToken()
        const response = await axios.get(`${baseUri}/${tipIdx}`, {params : { tipIdx : tipIdx }, headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined })
        return toApiBaseResponse<TipDeatilDto, undefined>(response)
    } catch (error) {
        return toApiErrorResponse<TipDeatilDto, undefined>(error)
    }
}

// tip 좋아요 변경
export const patchToggleTipLike = async (tipIdx : number) => {
    try {
        const accessToken = await getAccessToken()
        const response = await axios.patch(`${baseUri}/${tipIdx}/like`, {}, {headers : {Authorization: `Bearer ${accessToken}`}})
        return toApiBaseResponse<patchToggleLikeResult, undefined>(response)
    } catch (error) {
        return toApiErrorResponse<patchToggleLikeResult, undefined>(error)
    }
}

// tip 작성
export type postWriteTipResult = {
    tipIdx : number
}

export const postWriteTip = async (body : FormData) => {
    try {
        const accessToken = await getAccessToken()
        const response = await axios.post(`${baseUri}`, body, {headers : {"content-type" : "multipart/form-data",  Authorization : `Bearer ${accessToken}`}})
        return toApiBaseResponse<postWriteTipResult, undefined>(response)
    } catch(error) {
        return toApiErrorResponse<postWriteTipResult, undefined>(error)
    }
}
import axios from "axios"
import { baseUri, deleteResult, modifyResult, toApiBaseResponse, toApiErrorResponse } from "."
import { TipDeatilDto, TipDto } from "../type/DTO/tipDto"
import { getAccessToken } from "../util/token"
import { patchToggleLikeResult } from "./stories"

const tipBaseUri = baseUri + "/api/tips"

// best tip 조회
export const getBestTip = async () => {
    try {
        const respose = await axios.get(`${tipBaseUri}/best`)
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
        const response = await axios.get(`${tipBaseUri}`, { params: { cursor: nextCursor }})
        return toApiBaseResponse<TipDto[], getTipResultMeta>(response)
    } catch (error) {
        return toApiErrorResponse<TipDto[], getTipResultMeta>(error)
    }
}

// tip 상세 조회
export const getTipDetail = async (tipIdx : number) => {
    try { 
        const accessToken = await getAccessToken()
        const response = await axios.get(`${tipBaseUri}/${tipIdx}`, {params : { tipIdx : tipIdx }, headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined })
        return toApiBaseResponse<TipDeatilDto, undefined>(response)
    } catch (error) {
        return toApiErrorResponse<TipDeatilDto, undefined>(error)
    }
}

// tip 좋아요 변경
export const patchToggleTipLike = async (tipIdx : number) => {
    try {
        const accessToken = await getAccessToken()
        const response = await axios.patch(`${tipBaseUri}/${tipIdx}/like`, {}, {headers : {Authorization: `Bearer ${accessToken}`}})
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
        const response = await axios.post(`${tipBaseUri}`, body, {headers : {"content-type" : "multipart/form-data",  Authorization : `Bearer ${accessToken}`}})
        return toApiBaseResponse<postWriteTipResult, undefined>(response)
    } catch(error) {
        return toApiErrorResponse<postWriteTipResult, undefined>(error)
    }
}

// tip 수정
export const patchModifyTip = async (body : FormData, tipIdx : number) => {
    try {
        const accessToken = await getAccessToken()
        const response = await axios.patch(`${tipBaseUri}/${tipIdx}`, body, {headers : {"content-type" : "multipart/form-data", Authorization: `Bearer ${accessToken}`}})
        return toApiBaseResponse<modifyResult, undefined>(response)
    } catch (error) {
        return toApiErrorResponse<modifyResult, undefined>(error)
    }
}

// tip 삭제
export const deleteTip = async (tipIdx : number) => {
    try {
        const accessToken = await getAccessToken()
        const response = await axios.delete(`${tipBaseUri}/${tipIdx}`, {headers : {Authorization: `Bearer ${accessToken}`}})
        return toApiBaseResponse<deleteResult, undefined>(response)
    } catch (error) {
        return toApiErrorResponse<deleteResult, undefined>(error)
    }
}
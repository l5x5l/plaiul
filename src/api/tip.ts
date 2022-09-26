import axios from "axios"
import { toApiBaseResponse, toApiErrorResponse } from "."
import { TipDto } from "../type/DTO/tipDto"
import { getAccessToken } from "../util/token"

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
        const accessToken = await getAccessToken()
        const response = await axios.get(`${baseUri}`, { params: { cursor: nextCursor }, headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined })
        return toApiBaseResponse<TipDto[], getTipResultMeta>(response)
    } catch (error) {
        return toApiErrorResponse<TipDto[], getTipResultMeta>(error)
    }
}
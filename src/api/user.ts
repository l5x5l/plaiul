import axios from "axios";
import { baseUri, blockResult, pagingMeta, toApiBaseResponse, toApiErrorResponse } from ".";
import { TipDto } from "../type/DTO/tipDto";
import { UserDto } from "../type/DTO/userDto";
import { getAccessToken } from "../util/token";

const userBaseUri = baseUri + "/api/users"

export const getUserInfo = async (userIdx : number) => {
    try {
        const response = await axios.get(`${userBaseUri}/${userIdx}`)
        return toApiBaseResponse<UserDto, undefined>(response)
    } catch(error) {
        return toApiErrorResponse<UserDto, undefined>(error)
    }
}

export const getUserTipList = async (userIdx : number, sort : string, cursor ?: string) => {
    try {
        const response = await axios.get(`${userBaseUri}/${userIdx}/tips`,{params : {sort : sort, cursor : cursor}})
        return toApiBaseResponse<TipDto[], pagingMeta>(response)
    } catch (error) {
        return toApiErrorResponse<TipDto[], pagingMeta>(error)
    }
}

export const postBlockUser = async (userIdx : number) => {
    try {
        const accessToken = await getAccessToken()
        const response = await axios.post(`${userBaseUri}/block`, {userIdx : userIdx}, { headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined})
        return toApiBaseResponse<blockResult, undefined>(response)
    } catch (error) {
        return toApiErrorResponse<blockResult, undefined>(error)
    }
}
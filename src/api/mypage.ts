import axios from "axios"
import { baseUri, getDefaultHeader, toApiBaseResponse, toApiErrorResponse } from "."
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
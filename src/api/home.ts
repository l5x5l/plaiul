import axios from "axios"
import { baseUri, toApiBaseResponse, toApiErrorResponse } from "."
import { PostDto } from "../type/DTO/postDto"
import { TipDto } from "../type/DTO/tipDto"

const homeBaseUri = baseUri + "/api/home"

export type homeResult = {
    tips : TipDto[],
    popularPosts : PostDto[],
    recentlyPosts : PostDto[]
}

export const getHomeData = async () => {
    try {
        const response = await axios.get(`${homeBaseUri}`)
        console.log(JSON.stringify(response))
        return toApiBaseResponse<homeResult, undefined>(response)
    } catch (error) {
        console.log(JSON.stringify(error))
        return toApiErrorResponse<homeResult, undefined>(error)
    }
}
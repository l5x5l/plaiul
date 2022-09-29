import { DefaultUserDto, UserDto } from "./userDto"

export declare type TipDto = {
    tipIdx : number,
    title : string,
    thumbnail : string,
    user : UserDto
}

export declare type TipConetntDto = {
    type : number,
    text ?: string,
    image ?: string
}

export declare type TipDeatilDto = {
    tipIdx : number,
    title : string,
    thumbnail : string,
    isLiked : boolean,
    likeCnt : number,
    createdAt : string,
    user : UserDto,
    isWriter : boolean,
    content : TipConetntDto[]
}

export const DefaultTipDeatilDto : TipDeatilDto = {
    tipIdx : -1,
    title : "",
    thumbnail : "",
    isLiked : false,
    likeCnt : 0,
    createdAt : "",
    isWriter : false,
    user : DefaultUserDto,
    content : []
}
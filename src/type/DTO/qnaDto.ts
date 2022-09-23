import { DefaultUserDto, UserDto } from "./userDto"

export declare type QnaDto = {
    qnaIdx : number,
    title : string,
    content : string,
    isLiked : boolean,
    likeCnt : number,
    commentCnt : number,
    createdAt : string,
    user : UserDto,
    isWriter : boolean
}

const DefaultQnaDto : QnaDto = {
    qnaIdx : -1,
    title : "",
    content : "",
    isLiked : false,
    likeCnt : 0,
    commentCnt : 0,
    createdAt : "",
    user : DefaultUserDto,
    isWriter : false
}

export {DefaultQnaDto}
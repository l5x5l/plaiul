import { UserDto } from "./userDto"

export declare type PostDto = {
    qnaIdx? : number,
    storyIdx? : number,
    title : string,
    content : string,
    thumbnail : string,
    tags? : string[],
    isLiked? : boolean,
    likeCnt? : number,
    commentCnt? : number,
    createdAt? : string,
    user? : UserDto
}
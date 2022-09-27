import { RecommentDto } from "./reCommentDto"
import { DefaultUserDto, UserDto } from "./userDto"

export declare type CommentDto = {
    commentIdx : number,
    content : String,
    createdAt : String,
    isWriter : Boolean,
    isUserComment : Boolean,
    isBlocked : Boolean,
    isDeleted : Boolean,
    user : UserDto,
    reComments : RecommentDto[]
}

export const DefaultCommentDto : CommentDto = {
    commentIdx : -1,
    content : "",
    createdAt : "",
    isWriter : false,
    isUserComment : false,
    isBlocked : false,
    isDeleted : false,
    user : DefaultUserDto,
    reComments : []
}
import { UserDto } from "./userDto";

export declare type RecommentDto = {
    commentIdx : Number,
    content : String,
    createdAt : String,
    isWriter : Boolean,
    isUserComment : Boolean,
    isBlocked : Boolean,
    isDeleted : Boolean,
    user : UserDto,
}
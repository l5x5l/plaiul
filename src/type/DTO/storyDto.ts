import { DefaultUserDto, UserDto } from "./userDto"

export declare type StoryDto = {
    storyIdx : number,
    title : string,
    images : string[],
    content? : string,
    tags : string[],
    isLiked : boolean,
    likeCnt : number,
    commentCnt : number,
    createdAt : string,
    user : UserDto
}

const DefaultStoryDto : StoryDto = {
    storyIdx : -1,
    title : "",
    images : [""],
    tags : [""],
    isLiked : false,
    likeCnt : 0,
    commentCnt : 0,
    createdAt : "",
    user : DefaultUserDto
}

export {DefaultStoryDto}
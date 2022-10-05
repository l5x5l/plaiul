import { UserDto } from "./userDto"

export declare type PostDto = {
    qnaIdx?: number,
    storyIdx?: number,
    title: string,
    content?: string,
    thumbnail: string,
    tags?: string[],
    isLiked?: boolean,
    likeCnt?: number,
    commentCnt?: number,
    createdAt?: string,
    user?: UserDto
}

export declare type PairPostDto = {
    top ?: PostDto,
    bottom ?: PostDto
}

export const changePostDtoList = (postList: PostDto[]) => {
    const temp = [] as PairPostDto[]
    let i
    for (i = 0; i < Math.ceil(postList.length / 2); i ++) {
        temp.push({
            top : postList[i * 2],
            bottom : postList[i * 2 + 1]
        })
    }
    return temp
}
export declare type UserDto = {
    userIdx : number,
    nickname : string,
    profile? : string,
}

const DefaultUserDto : UserDto = {
    userIdx : -1,
    nickname : ""
}

export {DefaultUserDto}
import axios from "axios";
import { toApiBaseResponse, toApiErrorResponse } from ".";

const baseUri = "http://15.164.214.109"

// 로그인
export type loginResult = {
    accessToken: string,
    refreshToken: string
}

export const postLogin = (email: string, password: string) => axios.post(`${baseUri}/api/auth/login`, { email: email, password: password }).then(
    response => {
        return toApiBaseResponse<loginResult, undefined>(response)
    }
).catch((error) => {
    return toApiErrorResponse<loginResult, undefined>(error)
})

// 인증번호 발생 
export type authNumberResult = {
    sent : string
}

export const postAuthNumber = (email: string) => axios.post(`${baseUri}/api/auth`, { email: email }).then(
    response => toApiBaseResponse<authNumberResult, undefined>(response)    
).catch((error) => toApiErrorResponse<authNumberResult, undefined>(error))

// 인증번호 검증
export type checkAuthNumberResult = {
    verified : boolean
}

export const getCheckAuthNumber = (email : string, code : string) => axios.get(`${baseUri}/api/auth`, { params : { email : email, code : code }}).then(
    response => toApiBaseResponse<checkAuthNumberResult, undefined>(response)
).catch((error) => toApiErrorResponse<checkAuthNumberResult, undefined>(error))

// 닉네임 검증
export type checkNicknameResult = {
    verified : boolean
}

export const getCheckNickname = (nickname : string) => axios.get(`${baseUri}/api/auth`, {params : {nickname : nickname}}).then(
    response => toApiBaseResponse<checkNicknameResult, undefined>(response)
).catch((error) => toApiErrorResponse<checkNicknameResult, undefined>(error))

// 회원가입
export type signUpResult = {
    accessToken: string,
    refreshToken: string
}

export const postSignUp = (email : string, password : string, nickname : string) => axios.post(`${baseUri}/api/auth/sign-up`, {email : email, password : password, nickname : nickname}).then(
    response => toApiBaseResponse<signUpResult, undefined>(response)
).catch((error) => toApiErrorResponse<signUpResult, undefined>(error))

// 토큰 재발급
export type refreshTokenResult = {
    accessToken: string,
    refreshToken: string
}

export const postRefreshToken = () => axios.post(`${baseUri}/api/auth/refresh`).then(
    response => toApiBaseResponse<refreshTokenResult, undefined>(response)
).catch((error) => toApiErrorResponse<refreshTokenResult, undefined>(error))
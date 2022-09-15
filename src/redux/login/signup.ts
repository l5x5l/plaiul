import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface signupSliceState {
    email : string,
    password : string,
    nickname : string
}

const initialState : signupSliceState = {
    email : "",
    password : "",
    nickname : ""
}

const signUpSlice = createSlice({
    name : "signUp",
    initialState,
    reducers : {
        setNickname : (state, action : PayloadAction<string>) => {
            state.nickname = action.payload
        },
        setEmail : (state, action : PayloadAction<string>) => {
            state.email = action.payload
        },
        setPassword : (state, action : PayloadAction<string>) => {
            state.password = action.payload
        },
    }
})

export default signUpSlice
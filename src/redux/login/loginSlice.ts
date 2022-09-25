import { createSlice } from "@reduxjs/toolkit"

export interface loginSliceState {
    isLogin : boolean,
    isShowLoginBottomSheet : boolean
}

const initialState : loginSliceState = {
    isLogin : false,
    isShowLoginBottomSheet : false
}

const LoginSlice = createSlice({
    name : "login",
    initialState : initialState,
    reducers : {
        callBottomSheet : (state) => {
            state.isShowLoginBottomSheet = true
        },
        closeBottomSheet : (state) => {
            state.isShowLoginBottomSheet = false
        }
    },
    extraReducers : {

    }
})

export default LoginSlice
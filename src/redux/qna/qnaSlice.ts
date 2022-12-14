import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getQna, patchToggleQnaLike } from "../../api/qna"
import { patchToggleLikeResult } from "../../api/stories"
import { DefaultQnaDto, QnaDto } from "../../type/DTO/qnaDto"
import callNeedLoginApi from "../../util/callNeedLogin"

export interface qnaSliceState {
    isError : boolean,
    isLoading : boolean,
    value : QnaDto
}

export const loadQna = createAsyncThunk("qna/loadByIdx", async (qnaIdx : number) => {
    return await callNeedLoginApi(()=>getQna(qnaIdx))
})

export const toggleQnaLike = createAsyncThunk("story/like", async (qnaIdx : number) => {
    return await callNeedLoginApi<patchToggleLikeResult, any>(() => patchToggleQnaLike(qnaIdx))
})

const initialState : qnaSliceState = {
    isError : false,
    isLoading : false,
    value : DefaultQnaDto
}

const qnaSlice = createSlice({
    name : "qna",
    initialState,
    reducers : {
        claer : (state) => {
            state.value = DefaultQnaDto
            state.isError = false,
            state.isLoading = false
        },
        setQna : (state, action : PayloadAction<{title : string, content : string}>) => {
            state.value.title = action.payload.title
            state.value.content = action.payload.content
        }
    }, 
    extraReducers : (builder) => {
        builder.addCase(loadQna.pending, (state, action) => {
            state.isError = false,
            state.isLoading = true
        }),
        builder.addCase(loadQna.fulfilled, (state, action) => {
            if (action.payload?.data) {
                state.isLoading = false,
                state.isError = false,
                state.value = action.payload.data as QnaDto
            } else {
                state.isError = true,
                state.isLoading = false
            }
        }),
        builder.addCase(loadQna.rejected, (state, action) => {
            state.isError = true,
            state.isLoading = false
        }),
        builder.addCase(toggleQnaLike.fulfilled, (state, action) => {
            if (action.payload?.data) {
                state.value.isLiked = action.payload.data.isLiked
                if (action.payload.data.isLiked === true){
                    state.value.likeCnt += 1
                } else {
                    state.value.likeCnt -= 1
                }
            }
        })
    }
})

export default qnaSlice
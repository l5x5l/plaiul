import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getQna } from "../../api/stories"
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
        })
    }
})

export default qnaSlice
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getLikePost, getLikeTip, getMyCommentPost, getMyPost, getMyTip } from "../../api/mypage"
import { myPageLikeCategory } from "../../type/data/mypageLikeCategory"
import { postCategory } from "../../type/data/postCategory"
import { PostDto } from "../../type/DTO/postDto"
import { TipDto } from "../../type/DTO/tipDto"
import callNeedLoginApi from "../../util/callNeedLogin"

export interface myPagePostSliceState {
    category : myPageLikeCategory,
    detailCategory ?: postCategory,
    data : PostDto[] | TipDto[],
    lastSelectedIdx ?: number,
    nextCursor ?: string,
    isLoading : boolean,
    isError : boolean,
    isLast : boolean
}

export declare type loadMyPageDataParams = {
    category : myPageLikeCategory
    detailCategory ?: postCategory,
    cursor ?: string,
}

export const loadMyPostData = createAsyncThunk("mypage/load", async(params : loadMyPageDataParams) => {
    switch(params.category) {
        case "likePost":
            return await callNeedLoginApi(() => getLikePost(params.detailCategory!!, params.cursor))
        case "likeTip":
            return await callNeedLoginApi(() => getLikeTip(params.cursor))
        case "myPost":
            return await callNeedLoginApi(() => getMyPost(params.detailCategory!!, params.cursor))
        case "myTip":
            return await callNeedLoginApi(() => getMyTip(params.cursor))
        case "commentPost":
            return await callNeedLoginApi(() => getMyCommentPost(params.detailCategory!!, params.cursor))
    }
})

const initialState : myPagePostSliceState = {
    category : "likePost",
    data : [],
    isLoading : false,
    isError : false,
    isLast : false
}

const myPagePostSlice = createSlice({
    name : "mypageLike",
    initialState,
    reducers : {
        select : (state, action : PayloadAction<number>) => {
            state.lastSelectedIdx = action.payload
        },
        clear : (state) => {
            state.data = [],
            state.lastSelectedIdx = undefined,
            state.detailCategory = undefined,
            state.isLast = false
        },
        applyChangeToMyPageData : (state) => {
            const selectedIdx = state.lastSelectedIdx
            if (selectedIdx && state.data[selectedIdx]) {
                const temp = [...state.data]
                temp.splice(selectedIdx, 1)
                state.data = temp
            }
        },
        init : (state, action : PayloadAction<loadMyPageDataParams>) => {
            state.category = action.payload.category
            state.detailCategory = action.payload.detailCategory
        },
        changeDetailCategory : (state, action : PayloadAction<postCategory>) => {
            state.detailCategory = action.payload
            state.data = []
        },
        refresh : (state) => {
            state.isLast = false,
            state.nextCursor = undefined
        }
    },
    extraReducers : (builder) => {
        builder.addCase(loadMyPostData.pending, (state) => {
            state.isLoading = true
            state.isError = false
        }),
        builder.addCase(loadMyPostData.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false
            if (action.payload?.data){
                if (state.nextCursor){
                    if (state.detailCategory) {
                        const temp = [...state.data] as PostDto[]
                        const result = action.payload.data as PostDto[]
                        state.data = [...temp, ...result]
                    } else {
                        const temp = [...state.data] as TipDto[]
                        const result = action.payload.data as TipDto[]
                        state.data = [...temp, ...result]
                    }

                    if (action.payload.meta?.nextCursor)
                        state.nextCursor = action.payload.meta?.nextCursor
                    else 
                        state.isLast = true
                }
                else
                    state.data = action.payload.data
            }
        }),
        builder.addCase(loadMyPostData.rejected, (state) => {
            state.isLoading = false
            state.isError = true
        })
    }
})

export default myPagePostSlice
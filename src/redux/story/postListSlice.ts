import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getStoryList } from "../../api";
import { PostDto } from "../../type/DTO/postDto";

export interface postListSliceState {
    isError: boolean,
    isLoading: boolean,
    data: PostDto[],
    cursor?: string,
    sort: "popular" | "recently",
    category : "qna" | "story",
    isLast : boolean
}

const initialState: postListSliceState = {
    isError: false,
    isLoading: false,
    data: [],
    sort: "popular",
    isLast : false,
    category : "story"
}

export declare interface loadPageParam {
    cursor ?: string,
    sort: string
}

export const loadStoryList = createAsyncThunk("story/loadListByCursor", async (pageParam: loadPageParam) => {
    return await getStoryList(pageParam.sort, pageParam.cursor)
})

const postListSlice = createSlice({
    name: "storyList", 
    initialState, 
    reducers: {
        switchCategory : (state, action : PayloadAction<"story"|"qna">) => {
            state.category = action.payload
            state.data = []
            state.isLast = false
            state.cursor = undefined
        },
        switchSort : (state, action : PayloadAction<"popular" | "recently">) => {
            state.sort = action.payload
            state.data = []
            state.isLast = false
            state.cursor = undefined
        }
    }, 
    extraReducers: (builder) => {
        builder.addCase(loadStoryList.pending, (state, action) => {
            state.isLoading = true
            state.isError = false
        }),
        builder.addCase(loadStoryList.fulfilled, (state, action) => {
            console.log(`received data ${JSON.stringify(action.payload)}`)
            if (action.payload?.data !== undefined) {
                state.data = [...state.data, ...action.payload.data]
                console.log(`received data ${JSON.stringify(state.data)}`)
                if (action.payload?.meta?.nextCursor !== null) {
                    state.cursor = action.payload!!.meta!!.nextCursor
                } else {
                    state.isLast = true
                }
            }
            state.isLoading = false
            state.isError = false
        }),
        builder.addCase(loadStoryList.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
        })
    }
})

export default postListSlice
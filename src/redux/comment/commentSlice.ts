import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getStoryCommentList } from "../../api/stories";
import { CommentDto } from "../../type/DTO/commentDto";

export interface commentSliceState {
    isError: boolean,
    isLoading: boolean,
    data: CommentDto[],
    cursor?: string,
    targetRepltIdx?: number,
    isLast: boolean,
    postType: "story" | "qna",
    postIdx: number
}

const initialState: commentSliceState = {
    isError: false,
    isLoading: false,
    data: [],
    isLast: false,
    postType: "story",
    postIdx: -1
}

export declare interface loadCommentPageParam {
    postIdx: number,
    cursor?: string
}

export const loadCommentList = createAsyncThunk("comment/loadListByCursor", async (pageParam: loadCommentPageParam) => {
    return await getStoryCommentList(pageParam.postIdx, pageParam.cursor)
})

const commentSlice = createSlice({
    name: "commentList",
    initialState,
    reducers: {
        setBasePost: (state, action: PayloadAction<number>) => {
            state.postIdx = action.payload
        },
        setPostType: (state, action: PayloadAction<"story" | "qna">) => {
            state.postType = action.payload
        },
        clear: (state) => {
            state.postIdx = -1
            state.cursor = undefined
            state.data = []
            state.isLast = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loadCommentList.pending, (state, _) => {
            state.isError = false
            state.isLoading = true
        }), builder.addCase(loadCommentList.fulfilled, (state, action) => {
            if (action.payload.data !== undefined) {
                state.data = [...state.data, ...action.payload.data]
                console.log(`pagingData ! ${JSON.stringify(state.data)}`)
                if (action.payload.meta?.nextCursor !== null) {
                    state.cursor = action.payload!!.meta!!.nextCursor
                } else {
                    state.isLast = true
                }
            }
        }), builder.addCase(loadCommentList.rejected, (state, _) => {
            state.isLoading = false
            state.isError = true
        })
    }
})

export default commentSlice
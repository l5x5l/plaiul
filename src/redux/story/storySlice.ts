import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DefaultStoryDto, StoryDto } from "../../type/DTO/storyDto";
import { getStory, patchToggleLike, patchToggleLikeResult } from "../../api/stories";
import callNeedLoginApi from "../../util/callNeedLogin";

export interface storySliceState {
    isError: boolean,
    isLoading: boolean,
    value: StoryDto
}

export const loadStory = createAsyncThunk("story/loadByIdx", async (storyIdx: number) => {
    return await callNeedLoginApi(() =>getStory(storyIdx))
})

export const toggleLike = createAsyncThunk("story/like", async (storyIdx : number) => {
    return await callNeedLoginApi<patchToggleLikeResult, any>(() => patchToggleLike(storyIdx))
})

const initialState: storySliceState = {
    isError: false,
    isLoading: false,
    value: DefaultStoryDto
}

const storySlice = createSlice({
    name: "story",
    initialState,
    reducers: {
        setStory : (state, action : PayloadAction<{title : string, content : string, tags : string[], images : string[]}>) => {
            state.value.title = action.payload.title
            state.value.content = action.payload.content,
            state.value.tags = action.payload.tags,
            state.value.images = action.payload.images
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loadStory.pending, (state, action) => {
            state.isLoading = true
            state.isError = false
        }), builder.addCase(loadStory.fulfilled, (state, action) => {
            console.log(JSON.stringify(action.payload))
            if (action.payload?.data !== undefined) {
                state.value = (action.payload.data as StoryDto)
                state.isError = false
                state.isLoading = false
            } else {
                state.value = DefaultStoryDto
                state.isError = true
                state.isLoading = false
            }
        }), builder.addCase(loadStory.rejected, (state, action) => {
            //console.log(`${JSON.stringify(action)}`)
        }), builder.addCase(toggleLike.pending, (state, action) => {

        }), builder.addCase(toggleLike.fulfilled, (state, action) => {
            const isLiked = action.payload?.data?.isLiked
            if (isLiked !== undefined) {
                if (isLiked) {
                    state.value.likeCnt += 1
                } else {
                    state.value.likeCnt -= 1
                }
                state.value.isLiked = isLiked
            }
        }), builder.addCase(toggleLike.rejected, (state, action) => {
            //console.log(`${JSON.stringify(action)}`)
        })
    }
})

export default storySlice
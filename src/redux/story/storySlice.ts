import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DefaultStoryDto, StoryDto } from "../../type/DTO/storyDto";
import { getStory } from "../../api";

export interface storySliceState {
    isError: boolean,
    isLoading: boolean,
    value: StoryDto
}

export const loadStory = createAsyncThunk("story/loadByIdx", async (storyIdx: number) => {
    return await getStory(storyIdx)
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

    },
    extraReducers: (builder) => {
        builder.addCase(loadStory.pending, (state, action) => {
            // console.log(`${JSON.stringify(action)}`)
            // console.log("pending...")
            state.isLoading = true
            state.isError = false
        }), builder.addCase(loadStory.fulfilled, (state, action) => {
            console.log(JSON.stringify(action.payload))
            if (action.payload?.data !== undefined) {
                state.value = (action.payload.data)
                state.isError = false
                state.isLoading = false
            } else {
                state.value = DefaultStoryDto
                state.isError = true
                state.isLoading = false
            }
        }), builder.addCase(loadStory.rejected, (state, action) => {
            console.log(`${JSON.stringify(action)}`)
        })
    }
})

export default storySlice
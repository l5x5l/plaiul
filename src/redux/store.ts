import { configureStore } from "@reduxjs/toolkit";
import postListSlice from "./story/postListSlice";
import storySlice from "./story/storySlice";

export const store = configureStore({
    reducer : {
        story : storySlice.reducer,
        storyList : postListSlice.reducer
    }
})

export type rootState = ReturnType<typeof store.getState>
export type rootDispatch = typeof store.dispatch
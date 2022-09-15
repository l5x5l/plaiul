import { configureStore } from "@reduxjs/toolkit";
import signUpSlice from "./login/signup";
import postListSlice from "./story/postListSlice";
import storySlice from "./story/storySlice";

export const store = configureStore({
    reducer : {
        story : storySlice.reducer,
        storyList : postListSlice.reducer,
        signup : signUpSlice.reducer
    }
})

export type rootState = ReturnType<typeof store.getState>
export type rootDispatch = typeof store.dispatch
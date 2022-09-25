import { configureStore } from "@reduxjs/toolkit";
import signUpSlice from "./login/signup";
import commentSlice from "./comment/commentSlice";
import postListSlice from "./story/postListSlice";
import storySlice from "./story/storySlice";
import qnaSlice from "./qna/qnaSlice";
import LoginSlice from "./login/loginSlice";

export const store = configureStore({
    reducer : {
        story : storySlice.reducer,
        storyList : postListSlice.reducer,
        signup : signUpSlice.reducer,
        commentList : commentSlice.reducer,
        qna : qnaSlice.reducer,
        login : LoginSlice.reducer
    }
})

export type rootState = ReturnType<typeof store.getState>
export type rootDispatch = typeof store.dispatch
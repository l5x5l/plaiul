import { configureStore } from "@reduxjs/toolkit";
import signUpSlice from "./login/signup";
import commentSlice from "./comment/commentSlice";
import postListSlice from "./story/postListSlice";
import storySlice from "./story/storySlice";
import qnaSlice from "./qna/qnaSlice";
import LoginSlice from "./login/loginSlice";
import tipListSlice from "./tip/tipListSlice";
import myPagePostSlice from "./myPageLike.ts/myPageLikeSlice";

export const store = configureStore({
    reducer : {
        story : storySlice.reducer,
        storyList : postListSlice.reducer,
        signup : signUpSlice.reducer,
        commentList : commentSlice.reducer,
        qna : qnaSlice.reducer,
        login : LoginSlice.reducer,
        tipList : tipListSlice.reducer,
        mypagePost : myPagePostSlice.reducer
    }
})

export type rootState = ReturnType<typeof store.getState>
export type rootDispatch = typeof store.dispatch
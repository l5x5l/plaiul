import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBestTip, getTip } from "../../api/tip";
import { TipDto } from "../../type/DTO/tipDto";

export interface tipListSliceState {
    isBestDataError : boolean,
    isBestDataLoading : boolean,
    bestData : TipDto[],
    pagingError : boolean,
    pagingLoading : boolean,
    pagingData : TipDto[],
    cursor ?: string,
    isLast : boolean
}

export const loadBestTip = createAsyncThunk("tip/best", async () => {
    return await getBestTip()
})

export const loadTip = createAsyncThunk("tip/allTip", async (cursor ?: string) => {
    return await getTip(cursor)
})

const initialState : tipListSliceState = {
    isBestDataError : false,
    isBestDataLoading : false,
    bestData : [],
    pagingError : false,
    pagingLoading : false,
    pagingData : [],
    isLast : false
}


const tipListSlice = createSlice({
    name : "tipList",
    initialState : initialState,
    reducers : {

    },
    extraReducers : (builder) => {
        builder.addCase(loadBestTip.fulfilled, (state, action) => {
            state.isBestDataError = false
            state.isBestDataLoading = false
            if (action.payload.data) {
                state.bestData = [...action.payload.data]
            }
        }),
        builder.addCase(loadBestTip.pending, (state) => {
            state.isBestDataLoading = true
            state.isBestDataError = false
        }),
        builder.addCase(loadBestTip.rejected, (state) => {
            state.isBestDataError = true
            state.isBestDataLoading = false
        }),
        builder.addCase(loadTip.fulfilled, (state, action) => {
            state.pagingLoading = false
            state.pagingError = false
            if (action.payload.data) {
                if (state.cursor === undefined) {
                    state.pagingData = [...action.payload.data]
                } else {
                    state.pagingData = [...state.pagingData, ...action.payload.data]
                }

                if (action.payload?.meta?.nextCursor !== null) {
                    state.cursor = action.payload.meta?.nextCursor
                } else {
                    state.isLast = true
                }
            }
        }),
        builder.addCase(loadTip.rejected, (state) => {
            state.pagingError = true
            state.pagingLoading = false
        }),
        builder.addCase(loadTip.pending, (state) => {
            state.pagingLoading = true
            state.pagingError = false
        })
    }
})

export default tipListSlice
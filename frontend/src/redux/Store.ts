import {configureStore} from "@reduxjs/toolkit"
import { MainSliceReducer } from "./MainSlice"

export const store = configureStore({
    reducer : {
        mainSlice : MainSliceReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
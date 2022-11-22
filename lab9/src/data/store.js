import { configureStore } from "@reduxjs/toolkit"
import itemSlice from "./reducers"

export const store = configureStore({
    reducer: {
        items: itemSlice,
    }
})
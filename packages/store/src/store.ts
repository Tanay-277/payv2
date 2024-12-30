import { configureStore } from '@reduxjs/toolkit'
import balanceReducer from "./slices/balanceSlice"

export const store = configureStore({
    reducer: {
        balance: balanceReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
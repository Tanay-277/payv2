import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface BalanceState {
    value: number;
}

const initialState: BalanceState = {
    value: 0,
};

//@ts-ignore
export const balanceSlice = createSlice({
    name: "balance",
    initialState,
    reducers: {
        debit: (state, action: PayloadAction<number>) => {
            if (typeof action.payload !== 'number' || isNaN(action.payload)) {
                throw new Error("Payload must be a valid number");
            }
            state.value -= action.payload;
        },
        credit: (state, action: PayloadAction<number>) => {
            if (typeof action.payload !== 'number' || isNaN(action.payload)) {
                throw new Error("Payload must be a valid number");
            }
            state.value += action.payload;
        },
    },
});

export const { debit, credit } = balanceSlice.actions;

export default balanceSlice.reducer;
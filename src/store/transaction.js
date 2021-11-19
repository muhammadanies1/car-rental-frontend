import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listTransaction: [],
}

const transactionSlices = createSlice({
    name: "transaction",
    initialState: initialState,
    reducers: {
        getAllTransaction(state, data){
            state.listTransaction = data.payload;
        },
    },
});

export const transactionActions = transactionSlices.actions;

export default transactionSlices.reducer;
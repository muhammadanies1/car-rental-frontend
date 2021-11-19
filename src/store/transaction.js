import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listTransaction: [],
    listTransactionByUser: [],
}

const transactionSlices = createSlice({
    name: "transaction",
    initialState: initialState,
    reducers: {
        getAllTransaction(state, data){
            state.listTransaction = data.payload;

        },
        getAllTransactionByUser(state, data){
            state.listTransactionByUser = data.payload;
        }
    },
});

export const transactionActions = transactionSlices.actions;

export default transactionSlices.reducer;

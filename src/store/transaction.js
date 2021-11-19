import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listTransactionByUser: [],
}

const transactionSlices = createSlice({
    name: "transaction",
    initialState: initialState,
    reducers: {
        getAllTransactionByUser(state, data){
            state.listTransactionByUser = data.payload;
        },
    },
});

export const transactionActions = transactionSlices.actions;

export default transactionSlices.reducer;

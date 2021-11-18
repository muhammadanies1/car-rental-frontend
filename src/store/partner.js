import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    thispartner: {},
}

const partnerSlices = createSlice({
    name: "partner",
    initialState: initialState,
    reducers: {
        getPartner(state, data){
            state.thispartner = data.payload;
        },
    },
});

export const partnerActions = partnerSlices.actions;

export default partnerSlices.reducer;

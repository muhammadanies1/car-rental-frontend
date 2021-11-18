import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listCar: [],
    listCarByPartner:[]
}

const carSlices = createSlice({
    name: "car",
    initialState: initialState,
    reducers: {
        getAllCar(state, data){
            state.listCar = data.payload;
        },
        getCarByPartner(state, data){
            state.listCar = data.payload;
        },
    },
});

export const carActions = carSlices.actions;

export default carSlices.reducer;
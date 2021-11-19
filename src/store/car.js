import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listCar: [],
    listCarByPartner:[],
    listCarByPatnerId:[]
}

const carSlices = createSlice({
    name: "car",
    initialState: initialState,
    reducers: {
        getAllCarTrue(state, data){
            state.listCar = data.payload;
        },
        getCarByPartner(state, data){
            state.listCar = data.payload;
        },
        getCarByPartnerId(state,data){
            state.listCarByPatnerId = data.payload;
        }
    },
});

export const carActions = carSlices.actions;

export default carSlices.reducer;
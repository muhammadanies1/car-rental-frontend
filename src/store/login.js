import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogin: false,
}

const loginSlices = createSlice({
    name: "login",
    initialState: initialState,
    reducers: {
        login(state, data){
            console.log("Button Login.");
        },
        logout(state){
            localStorage.clear();
            state.isLogin = false;
        },
    },
});

export const loginActions = loginSlices.actions;

export default loginSlices.reducer;
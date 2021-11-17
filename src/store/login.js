import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

const initialState = {
    isLogin: false,
    token: null,
    userDetail:{},
}

const loginSlices = createSlice({
    name: "login",
    initialState: initialState,
    reducers: {
        login(state, data){
            localStorage.setItem("token", data.payload);
            let decode = jwt_decode(data.payload);
            console.log(decode);
            localStorage.setItem("user_id", decode.user_id);
            localStorage.setItem("role", decode.role_id);
            state.userDetail = decode;
            state.token = data.payload;
            state.isLogin = true;
        },
        logout(state){
            localStorage.clear();
            state.isLogin = false;
        },
    },
});

export const loginActions = loginSlices.actions;

export default loginSlices.reducer;
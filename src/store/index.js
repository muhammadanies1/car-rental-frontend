import { configureStore } from "@reduxjs/toolkit";
import login from "./login";

const store = configureStore({
    reducer: {
        login: login,
    },
});

export default store;
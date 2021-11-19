import { configureStore } from "@reduxjs/toolkit";
import car from "./car";
import login from "./login";
import partner from "./partner";

const store = configureStore({
    reducer: {
        login: login,
        partner : partner,
        car : car
    },
});

export default store;
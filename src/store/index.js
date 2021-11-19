import { configureStore } from "@reduxjs/toolkit";
import car from "./car";
import login from "./login";
import partner from "./partner";
import transaction from "./transaction";

const store = configureStore({
    reducer: {
        login: login,
        partner : partner,
        car : car,
        transaction : transaction
    },
});

export default store;
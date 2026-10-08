import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth.slice.js";
import uiSlice from "./auth.slice.js";

const store = configureStore({
    reducer: {
        auth: authSlice,
        ui: uiSlice,
    },
});

export default store;
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@/store/auth.slice.js";
import uiSlice from "@/store/ui.slice.js";

const store = configureStore({
    reducer: {
        auth: authSlice,
        ui: uiSlice,
    },
});

export default store;
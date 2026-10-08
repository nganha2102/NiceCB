import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    collapsed: false,
    lang: 'en',
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleSidebar: state => {
            state.collapsed = !state.collapsed;
        },
        setLang: (state, { payload }) => {
            state.lang = payload;
        },
    },
});

export const { toggleSidebar, setLang } = uiSlice.actions;

export default uiSlice.reducer;

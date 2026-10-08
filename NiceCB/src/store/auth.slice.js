import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    token: localStorage.getItem('accessToken'),
    isAuthenticated: !!localStorage.getItem('accessToken'),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, { payload }) => {
            const { user, token } = payload;
            state.user = user;
            state.token = token;
            state.isAuthenticated = true;
            localStorage.setItem('accessToken', token);
        },
        logout: state => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem('accessToken');
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = state => state.auth.user;
export const selectIsAuthenticated = state => state.auth.isAuthenticated;
export const selectToken = state => state.auth.token;

import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    isAuthenticated: !!token,
    token: token || null,
    username: user?.username || "",
    role: user?.role || "",
};

const authSlice = createSlice({
    name: "auth",

    initialState,

    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.username = action.payload.username;
            state.role = action.payload.role;

            localStorage.setItem("token", action.payload.token);

            localStorage.setItem(
                "user",
                JSON.stringify({
                    username: action.payload.username,
                    role: action.payload.role,
                })
            );
        },

        logout: (state) => {
            state.isAuthenticated = false;
            state.token = null;
            state.username = "";
            state.role = "";

            localStorage.removeItem("token");
            localStorage.removeItem("user");
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
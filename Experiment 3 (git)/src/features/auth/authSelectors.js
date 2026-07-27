export const selectAuth = (state) => state.auth;

export const selectRole = (state) => state.auth.role;

export const selectUsername = (state) => state.auth.username;

export const selectIsAuthenticated = (state) =>
    state.auth.isAuthenticated;
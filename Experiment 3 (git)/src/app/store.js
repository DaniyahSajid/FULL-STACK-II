import { configureStore } from "@reduxjs/toolkit";

import postsReducer from "../features/posts/postSlice";
import platformsReducer from "../features/platforms/platformSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        platforms: platformsReducer,
        auth: authReducer,
    },
});
import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import postsReducer from "../features/posts/postSlice";
import platformsReducer from "../features/platforms/platformSlice";
import calendarReducer from "../features/calendar/calendarSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        posts: postsReducer,
        platforms: platformsReducer,
        calendar: calendarReducer
    },
});
import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./features/posts/postStore";
import userReducer from "../app/features/users/userSlice";

export const store = configureStore({
  reducer: {
    posts: postReducer,
    users: userReducer,
  },
});

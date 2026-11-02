import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./slices/userSlice";
import PostSlice from "./slices/postSlice";

const store = configureStore({
    reducer: {
        User: UserSlice,
        Post: PostSlice

    }
})

export default store;
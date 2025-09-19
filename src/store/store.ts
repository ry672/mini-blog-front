import { configureStore } from "@reduxjs/toolkit";
import {authApi} from "./Api/AuthApi";
import userSlice    from"./userSlice/userSclice";
import { postApi } from "./Api/PostApi";
import { commentApi } from "./Api/Commentapi";
import { categoryApi } from "./Api/CaregoryApi";
import { userApi } from "./Api/UserApi";

export const store = configureStore({
    reducer: {
        user:userSlice,
        [authApi.reducerPath]: authApi.reducer,
        [postApi.reducerPath]: postApi.reducer,
        [commentApi.reducerPath]: commentApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [userApi.reducerPath]: userApi.reducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([authApi.middleware, postApi.middleware, commentApi.middleware, userApi.middleware, categoryApi.middleware]),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
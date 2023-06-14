import { configureStore } from "@reduxjs/toolkit";
import { LoginSlice } from "./LoginSlice";
import { SignupSlice } from "./SignUpSlice";
import { UserSlice } from "./UserSlice";

const store = configureStore({
    reducer: {
        login: LoginSlice.reducer,
        signup: SignupSlice.reducer,
        users: UserSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false
        })
});

export default store;

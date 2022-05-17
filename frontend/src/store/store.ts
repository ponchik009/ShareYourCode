import { configureStore } from "@reduxjs/toolkit";
import { api } from "../api";
import { authReducer } from "./reducer/authReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddlaware) =>
    getDefaultMiddlaware({
      thunk: {
        extraArgument: api,
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

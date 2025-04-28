import { configureStore } from "@reduxjs/toolkit";

import { baseApi } from "./api/baseApi";


export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
  
  }, // Use the persisted root reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from "@reduxjs/toolkit";
import notificationSlice from "./notificationSlice";

const store = configureStore({
  reducer: { notification: notificationSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store;

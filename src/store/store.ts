import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import rewardsReducer from "../features/rewardsStore/redux/rewardsSlice";
import userReducer from "../features/rewardsStore/redux/userSlice"
export const store = configureStore({
 reducer: {
  theme: themeReducer,
  rewards: rewardsReducer,
  user: userReducer,
 },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

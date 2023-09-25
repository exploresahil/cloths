import { configureStore } from "@reduxjs/toolkit";
import CardReducer from "./reducer/cartSlice";
import userSlice from "./reducer/userSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { updateRedx } from "@/backend/User";
import db from "@/backend/Backend.client";
export const store = configureStore({
  reducer: {
    CardReducer,
    userSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (da) => {
    return da().concat(({ getState }) => (next) => async (action) => {
      console.log("ss=>", action);

      const result = next(action);
      if (action.type != "CartCounter/reset" || action.type != "Users/reset") {
        const data = JSON.parse(localStorage.getItem("userData") || "{}");

        updateRedx(data.extra_data.id, getState());
        localStorage.setItem("applicationState", JSON.stringify(getState()));
      }

      return result;
    });
  },
});
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from "@reduxjs/toolkit";
import CardReducer from "./reducer/cartSlice";
import userSlice from "./reducer/userSlice";
import userDataSlice from "./reducer/userData";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { updateRedx } from "@/backend/User";
import CDB from "@/storeage";
import { Users } from "@/types";
export const store = configureStore({
  reducer: {
    CardReducer,
    userSlice,
    userDataSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (da) => {
    return da().concat(({ getState }) => (next) => async (action) => {
      console.log(action);

      const result = next(action);
      if (action.type != "CartCounter/reset" || action.type != "Users/reset") {
        const data = await CDB.getItem<Users>("user-data");
        if (data) {
          updateRedx(data.extra_data.id, getState());
        }
      }
      await CDB.setItem("Redux-stores", getState());

      return result;
    });
  },
});
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

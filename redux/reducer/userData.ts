import { Users } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  value: Users;
} = {
  value: {
    data: {
      user: null,
    },
    extra_data: {
      id: "",
      created_at: "",
      user: "",
      name: "",
      super_admin: false,
    },
  },
};
export const UsersData = createSlice({
  name: "UsersData",
  initialState,
  reducers: {
    reset: () => initialState,
    _reset: () => initialState,
    set: (state, action) => {
      console.log(action.payload);

      state.value = action.payload;
    },
    addUserData: (state, action) => {
      console.log("-->", action.payload);

      state.value = action.payload;
    },
    removeUserData: (state) => {
      state.value = initialState.value;
    },
  },
});
export const { set, reset, addUserData, removeUserData, _reset } =
  UsersData.actions;
export default UsersData.reducer;

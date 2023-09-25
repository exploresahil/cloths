import { createSlice } from "@reduxjs/toolkit";
import { client2 } from "@/backend/Backend.client";
interface user_address {
  id: number;
  address: string;
  locality: string;
  state: string;
  pincode: string;
  more_info: string;
  city: string;
  region: string;
  phone: string;
}

type Users = {
  value: user_address[];
};

const initialState = {
  value:
    window != undefined
      ? JSON.parse(localStorage?.getItem("UserAddress") || "[]") || []
      : [],
} as Users;

export const UsersS = createSlice({
  name: "Users",
  initialState,
  reducers: {
    reset: () => initialState,
    set: (state, action) => {
      console.log(action.payload);

      state.value = action.payload;
    },
    addUserAddress: (state, action) => {
      state.value.push(action.payload);

      localStorage.setItem("UserAddress", JSON.stringify(state.value));
    },
    removeUserAddress: (state, action) => {
      state.value = state.value.filter((v) => v.id != action.payload);
      localStorage.setItem("UserAddress", JSON.stringify(state.value));
    },
  },
});
export const { set, reset, addUserAddress, removeUserAddress } = UsersS.actions;
export default UsersS.reducer;

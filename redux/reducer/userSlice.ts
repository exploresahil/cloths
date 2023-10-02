import { createSlice } from "@reduxjs/toolkit";

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
  email: string;
}

type Users = {
  value: user_address[];
};

const initialState = {
  value: [],
} as Users;

export const UsersS = createSlice({
  name: "Users",
  initialState,
  reducers: {
    reset: () => initialState,
    _reset: () => initialState,
    set: (state, action) => {
      console.log(action.payload);

      state.value = action.payload;
    },
    addUserAddress: (state, action) => {
      state.value.push(action.payload);
    },
    removeUserAddress: (state, action) => {
      state.value = state.value.filter((v) => v.id != action.payload);
    },
  },
});
export const { set, reset, addUserAddress, removeUserAddress, _reset } =
  UsersS.actions;
export default UsersS.reducer;

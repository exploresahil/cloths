import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartState = {
  value: number;
};

const initialState = {
  value: parseInt(localStorage?.getItem("card") || "") || 0,
} as CartState;

export const CartCounter = createSlice({
  name: "CartCounter",
  initialState,
  reducers: {
    reset: () => initialState,
    increment: (state) => {
      state.value += 1;
      localStorage.setItem("card", state.value.toString());
    },
    decrement: (state) => {
      state.value -= 1;
      localStorage.setItem("card", state.value.toString());
    },
  },
});
export const { increment, decrement, reset } = CartCounter.actions;
export default CartCounter.reducer;

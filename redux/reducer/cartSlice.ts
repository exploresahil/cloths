import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartState = {
  value: number;
};

const initialState = {
  value: 0,
} as CartState;

export const CartCounter = createSlice({
  name: "CartCounter",
  initialState,
  reducers: {
    reset: () => initialState,
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});
export const { increment, decrement, reset } = CartCounter.actions;
export default CartCounter.reducer;

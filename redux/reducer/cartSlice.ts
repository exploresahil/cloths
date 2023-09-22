import { AddCartOrder, getProCart, RemoveCartOrder } from "@/backend/Cart";
import { products } from "@/types/Products";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface card {
  product: products;
  id: string;
  how_many: number;
  created_at: string;
  user: string;
}
type CartState = {
  value: Array<card | any>;
};

const initialState = {
  value:
    window != undefined
      ? JSON.parse(localStorage?.getItem("card") || "[]") || []
      : [],
} as CartState;

export const CartCounter = createSlice({
  name: "CartCounter",
  initialState,
  reducers: {
    reset: () => initialState,
    addToCard: (state, action) => {
      state.value = action.payload;
      localStorage.setItem("card", JSON.stringify(state.value));
    },
    removeToCard: (state, action) => {
      state.value = action.payload;
      localStorage.setItem("card", JSON.stringify(state.value));
    },
  },
});
export const { addToCard, removeToCard, reset } = CartCounter.actions;
export default CartCounter.reducer;

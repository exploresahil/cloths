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
  value: [],
} as CartState;

export const CartCounter = createSlice({
  name: "CartCounter",
  initialState,
  reducers: {
    reset: () => initialState,
    _reset: () => initialState,
    set: (state, action) => {
      console.log(action.payload);
      state.value = action.payload;
    },
    addToCard: (state, action) => {
      state.value = action.payload;
    },
    removeToCard: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { addToCard, removeToCard, reset, set, _reset } =
  CartCounter.actions;
export default CartCounter.reducer;

import { Product } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

// Define types for the cart item and state
interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

// Create a slice for the cart
const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] } as CartState,
  reducers: {
    addToCart: (state, { payload }: { payload: Product }) => {
      const item = state.items.find((p) => p.id === payload.id);
      if (item) {
        item.quantity++;
      } else {
        state.items.push({ ...payload, quantity: 1 });
      }
      toast.success(`${payload.title} is added to cart 🛍️`);
    },
    removeFromCart: (
      state,
      { payload: { id } }: { payload: { id: string } }
    ) => {
      const item = state.items.find((p) => p.id === id);
      if (item) {
        state.items = state.items.filter((item) => item.id !== id);
        toast.warning(`${item.title} is removed from the cart 🗑️`);
        const remainingItems = state.items.length;
        toast.info(
          `You have ${remainingItems} item${
            remainingItems !== 1 ? "s" : ""
          } left in your cart 🛒`
        );
      }
    },
  },
});

// Create a persisted reducer
export const cartReducer = cartSlice.reducer;

// Export actions and store
export const { addToCart, removeFromCart } = cartSlice.actions;

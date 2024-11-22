import { Product } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

interface FavouriteState {
  items: Product[];
}

// Create a slice for the favourites
const favouriteSlice = createSlice({
  name: "favorites",
  initialState: { items: [] } as FavouriteState,
  reducers: {
    like: (state, { payload }: { payload: Product }) => {
      const item = state.items.find((p) => p.id === payload.id);
      if (item) {
        toast.success(`${payload.title} is already in your favorites 🛍️`);
      } else {
        state.items.push(payload);
        toast.success(`${payload.title} is added to favourites 🛍️`);
      }
    },
    dislike: (state, { payload: { id } }: { payload: { id: string } }) => {
      const item = state.items.find((p) => p.id === id);
      if (item) {
        state.items = state.items.filter((item) => item.id !== id);
        toast.warning(`${item.title} is removed from the favourites 🗑️`);
      }
    },
  },
});

// Create a persisted reducer
export const favouriteReducer = favouriteSlice.reducer;

// Export actions and store
export const { like, dislike } = favouriteSlice.actions;

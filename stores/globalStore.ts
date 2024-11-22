import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: {
    filteredProductsLoading: false,
  },
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    updateLoading(
      state,
      {
        payload: { isLoading, loaders },
      }: {
        payload: {
          loaders: LoaderName | LoaderName[];
          isLoading: boolean;
        };
      }
    ) {
      for (const loader of [loaders].flat()) {
        state.loading[loader] = isLoading;
      }
    },
  },
});

export type LoaderName = keyof typeof initialState.loading;

export const globalReducer = globalSlice.reducer;

export const { updateLoading } = globalSlice.actions;

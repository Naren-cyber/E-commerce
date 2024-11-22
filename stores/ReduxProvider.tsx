"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { PropsWithChildren } from "react";
import {
  Provider,
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
} from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";
import { cartReducer } from "./cartReducer";
import { favouriteReducer } from "./favouriteReducer";
import { globalReducer } from "./globalStore";

const rootReducer = combineReducers({
  cart: cartReducer,
  favourites: favouriteReducer,
  global: globalReducer,
});

const store = configureStore({
  reducer: persistReducer(
    { key: "root", storage, blacklist: ["global"] },
    rootReducer
  ) as unknown as typeof rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

function ReduxProvider({ children }: PropsWithChildren) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
export default ReduxProvider;

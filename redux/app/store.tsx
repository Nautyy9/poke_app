import { configureStore } from "@reduxjs/toolkit";
import { pokemonApi } from "../services/pokemonApi";

const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: true,
      serializableCheck: true,
    }).concat(pokemonApi.middleware),
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
});
export default store;

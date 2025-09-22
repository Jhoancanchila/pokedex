/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from './slices/pokemonSlice';
import type { RootState } from './types';

export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
  },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [],
      },
    }),
  devTools: true, // Always enable for development
});

export type AppDispatch = typeof store.dispatch;
export type { RootState };

export default store;

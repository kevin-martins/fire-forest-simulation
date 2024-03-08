import { configureStore } from '@reduxjs/toolkit';
import tileReducer from '../features/tileSlice';
import terrainReducer from '../features/terrainSlice';

export const store = configureStore({
  reducer: {
    terrainConfig: terrainReducer,
    tileConfig: tileReducer
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

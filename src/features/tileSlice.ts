import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import TileConfigProps, { TileState } from '../models/terrainConfig';

type InitialState = TileConfigProps

const config = {
  temperature: 22,
  humidity: 36,
  burningDuration: 1,
  burnChance: 50
}

const initialState: InitialState = {
  ...config,
  coordinates: {
    row: 0,
    col: 0,
  },
  state: TileState.Initial,
  lifetime: 0
};

export const tileSlice = createSlice({
  name: 'tileConfig',
  initialState,
  reducers: {
    setTemperature(state, action: PayloadAction<number>) {
      state.temperature = action.payload
    },
    setHumidity(state, action: PayloadAction<number>) {
      state.humidity = action.payload
    },
    setState(state, action: PayloadAction<TileState>) {
      state.state = action.payload
    },
    setBurningDuration(state, action: PayloadAction<number>) {
      state.burningDuration = action.payload
    },
    setLifeTime(state, action: PayloadAction<number>) {
      state.lifetime = action.payload
    },
    setBurnChance(state, action: PayloadAction<number>) {
      state.burnChance = action.payload
    }
  }
});

export const {
  setTemperature,
  setHumidity,
  setState,
  setBurningDuration,
  setLifeTime,
  setBurnChance
} = tileSlice.actions;

export default tileSlice.reducer;

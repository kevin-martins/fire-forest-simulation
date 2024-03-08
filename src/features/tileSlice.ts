import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import TileConfigProps, { TileState } from '../models/terrainConfig';

const initialState: TileConfigProps = {
  coordinates: {
    row: 0,
    col: 0,
  },
  temperature: 15,
  humidity: .5,
  state: TileState.None,
  burningDuration: 1,
  lifeTime: 0
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
      state.lifeTime = action.payload
    }
  }
});

export const {
  setTemperature,
  setHumidity,
  setState,
  setBurningDuration,
  setLifeTime
} = tileSlice.actions;

export default tileSlice.reducer;

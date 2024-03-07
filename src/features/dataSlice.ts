import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import TerrainConfigProps, { TerrainState } from '../models/terrainConfig';
import WorldConfigProps from '../models/worldConfig';

type InitialState = {
  worldConfig: WorldConfigProps
  terrainConfig: TerrainConfigProps
}

const initialState: InitialState = {
  worldConfig: {
    width: 10,
    height: 10
  },
  terrainConfig: {
    coordinates: [],
    temperature: 20 ,
    humidity: 0,
    state: TerrainState.None,
    burningDuration: 1
  }
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    updateWorldConfig(state, action: PayloadAction<WorldConfigProps>) {
      state.worldConfig = action.payload
    },
    updateTerrainConfig(state, action: PayloadAction<TerrainConfigProps>) {
      state.terrainConfig = action.payload
    }
  }
});

export const {
  updateWorldConfig,
  updateTerrainConfig
} = dataSlice.actions;

export default dataSlice.reducer;

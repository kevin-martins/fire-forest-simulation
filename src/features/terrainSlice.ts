import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import TileConfigProps from '../models/terrainConfig';
import SimulationState from '../models/simulationState';

interface InitialState {
  terrain: TileConfigProps[][]
  width: number
  height: number
  simulationState: SimulationState
}

const initialState: InitialState = {
  terrain: [],
  width: 10,
  height: 10,
  simulationState: SimulationState.Init,
};

export const terrainSlice = createSlice({
  name: 'terrainConfig',
  initialState,
  reducers: {
    setWidth(state, action: PayloadAction<number>) {
      state.width = action.payload
    },
    setHeight(state, action: PayloadAction<number>) {
      state.height = action.payload
    },
    setTerrain(state, action: PayloadAction<TileConfigProps[][]>) {
      state.terrain = action.payload
    },
    setState(state, action: PayloadAction<SimulationState>) {
      state.simulationState = action.payload
    }
  }
});

export const {
  setWidth,
  setHeight,
  setTerrain
} = terrainSlice.actions;

export default terrainSlice.reducer;

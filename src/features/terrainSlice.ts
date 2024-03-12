import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import TileConfigProps from '../models/terrainConfig';
import PlayModeState from '../models/playModeState';
import GameState from '../models/gameState';

interface InitialState {
  loading: boolean
  terrain: TileConfigProps[][]
  width: number
  height: number
  gameState: GameState
  playMode: PlayModeState
  hoverTile: boolean
  error: string[]
  burningTiles: number
  ashTiles: number
  autoIgniteQuantity: number
}

const config = {
  width: 10,
  height: 10,
}

const initialState: InitialState = {
  ...config,
  loading: false,
  terrain: [],
  gameState: GameState.Config,
  playMode: PlayModeState.Step,
  hoverTile: false,
  error: [],
  burningTiles: 0,
  ashTiles: 0,
  autoIgniteQuantity: 20
};

export const generateTerrain = createAsyncThunk(
  'terrain/generateTerrain',
  async (payload: { width: number; height: number, tileConfig: TileConfigProps }) => {
    const { width, height, tileConfig } = payload
    const newTerrain: TileConfigProps[][] = []
    
    for (let i = 0; i < height; i++) {
      const row: TileConfigProps[] = []
      for (let j = 0; j < width; j++) {
        const config: TileConfigProps = {
          ...tileConfig,
          coordinates: {
            row: i + 1,
            col: j + 1
          },
        }
        row.push({ ...config })
      }
      newTerrain.push(row)
    }
    return newTerrain
  }
);



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
    setGameState(state, action: PayloadAction<GameState>) {
      state.gameState = action.payload
    },
    setSimulationState(state, action: PayloadAction<PlayModeState>) {
      state.playMode = action.payload
    },
    setHoverTile(state, action: PayloadAction<boolean>) {
      state.hoverTile = action.payload
    },
    setBurningTiles(state, action: PayloadAction<number>) {
      console.log(action.payload)
      state.burningTiles = action.payload
    },
    setAshTiles(state, action: PayloadAction<number>) {
      state.ashTiles = action.payload
    },
    setAutoIgniteQuantity(state, action: PayloadAction<number>) {
      state.autoIgniteQuantity = action.payload
    },
    addError(state, action: PayloadAction<string>) {
      state.error.push(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(generateTerrain.pending, (state) => {
      state.loading = true
      state.error = []
    });
    builder.addCase(generateTerrain.fulfilled, (state, action) => {
      state.loading = false
      state.terrain = action.payload
    });
    builder.addCase(generateTerrain.rejected, (state, action) => {
      state.loading = false
      action.error.message ?? state.error.push('An error occurred while generating terrain.')
    });
  },
});

export const {
  setWidth,
  setHeight,
  setTerrain,
  setGameState,
  setSimulationState,
  setHoverTile,
  setBurningTiles,
  setAshTiles,
  setAutoIgniteQuantity,
  addError
} = terrainSlice.actions;

export default terrainSlice.reducer;

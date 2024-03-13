import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import TileConfigProps from '../models/terrainConfig';
import PlayModeState from '../models/playModeState';
import GameState from '../models/gameState';
import NotificationProps from '../models/notification';

interface InitialState {
  terrain: TileConfigProps[][]
  width: number
  height: number
  gameState: GameState
  playMode: PlayModeState
  hoverTile: boolean
  notifications: NotificationProps[]
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
  terrain: [],
  gameState: GameState.Config,
  playMode: PlayModeState.Step,
  hoverTile: false,
  notifications: [],
  burningTiles: 0,
  ashTiles: 0,
  autoIgniteQuantity: 20
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
    addNotification(state, action: PayloadAction<NotificationProps>) {
      state.notifications.unshift(action.payload)
    },
    removeNotification(state, action: PayloadAction<NotificationProps[]>) {
      state.notifications = action.payload
    }
  }
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
  addNotification,
  removeNotification
} = terrainSlice.actions;

export default terrainSlice.reducer;

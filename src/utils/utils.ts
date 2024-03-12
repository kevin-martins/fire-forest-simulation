import PlayModeState from "../models/playModeState";
import { TileState } from "../models/terrainConfig";


export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const randomNumberRange = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const tileStateToText = (state: TileState) => {
  switch (true) {
    case state === TileState.Initial: return 'Initial'
    case state === TileState.Burning: return 'Burning'
    case state === TileState.Ash: return 'Burned'
    default: return 'None'
  }
}

export const simulationStateToText = (state: PlayModeState) => {
  switch (true) {
    case state === PlayModeState.Auto: return 'Auto'
    case state === PlayModeState.Step: return 'Step by step'
    default: return 'None'
  }
}

export const getBackgroundColor = (state: TileState) => {
  switch (state) {
    case TileState.Initial: return '#16a34a'
    case TileState.Ash: return '#475569'
    case TileState.Burning: return '#ca8a04'
    default: return ''
  }
}
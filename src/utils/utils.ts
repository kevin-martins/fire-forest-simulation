import GameState from "../models/gameState";
import SimulationState from "../models/simulationState";
import { TileState } from "../models/terrainConfig";

export const randomNumberRange = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const tileStateToText = (state: TileState) => {
  switch (true) {
    case state === TileState.Initial: return 'Initial'
    case state === TileState.Burning: return 'Burning'
    case state === TileState.Ash: return 'Burned'
    default: return 'None'
  }
}

export const getNextGameState = (state: GameState): GameState => {
  switch (true) {
    case state === GameState.Config: return GameState.Fire
    case state === GameState.Fire: return GameState.BeforeStart
    case state === GameState.BeforeStart: return GameState.End
    default: return GameState.End
  }
}

export const simulationStateToText = (state: SimulationState) => {
  switch (true) {
    case state === SimulationState.Auto: return 'Auto'
    case state === SimulationState.Step: return 'Step by step'
    default: return 'None'
  }
}
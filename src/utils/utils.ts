import SimulationState from "../models/simulationState";
import { TileState } from "../models/terrainConfig";

export const randomNumberRange = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const tileStateToText = (state: TileState) => {
  switch(state) {
    case 0: return 'Forest'
    case 1: return 'Fire'
    case 2: return 'Ash'
  }
}

export const simulationStateToText = (state: SimulationState) => {
  switch(state) {
    case 0: return 'Initialisation'
    case 1: return 'Step by Step'
    case 2: return 'Auto'
    case 2: return 'Stop'
  }
}
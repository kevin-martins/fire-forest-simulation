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
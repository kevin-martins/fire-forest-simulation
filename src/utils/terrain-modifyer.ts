import TileConfigProps, { TileState } from "../models/terrainConfig";
import { randomNumberRange } from "./utils";

export const temperatureColor = (temperature: number) => {
  switch (true) {
    case temperature >= -20 && temperature < 0:
      return "bg-blue-500"; // Cold colors
    case temperature >= 0 && temperature < 20:
      return "bg-green-500"; // Moderate colors
    case temperature >= 20 && temperature <= 50:
      return "bg-red-500"; // Hot colors
    default:
      return "bg-gray-500";
  }
}

export const handleTerrainGeneration = (
  width: number,
  height: number,
  tileConfig: TileConfigProps
): TileConfigProps[][] => {
  const newTerrain: TileConfigProps[][] = []
  for (let i = 0; i < height; i++) {
    const row: TileConfigProps[] = []
    for (let j = 0; j < width; j++) {
      const config: TileConfigProps = {
        ...tileConfig,
        coordinates: {
          row: i,
          col: j
        },
      }
      row.push({ ...config })
    }
    newTerrain.push(row)
  }
  return newTerrain
}

export const updateTile = (
  terrain: TileConfigProps[][], 
  coordinates: { row: number, col: number },
  newProps: Partial<TileConfigProps>
): TileConfigProps[][] => {
  const newArray = terrain.map((row) => [...row])
  const { row, col } = coordinates
  if (row >= 0 && row < newArray.length && col >= 0 && col < newArray[row].length) {
    newArray[row][col] = {
      ...newArray[row][col],
      ...newProps
    }
  }
  return newArray
}

export const igniteRandomTiles = (
  width: number,
  height: number,
  quantity: number,
  terrain: TileConfigProps[][]
): TileConfigProps[][] => {
  const getRandomTile = () => newArray[randomNumberRange(0, height - 1)][randomNumberRange(0, width - 1)]
  const newArray = terrain.map((row) => [...row])
  for (let i = 0; i < quantity; i++) {
    while (true) {
      const randomTile = getRandomTile()
      if (randomTile.state === TileState.Initial) {
        newArray[randomTile.coordinates.row][randomTile.coordinates.col] = {
          ...randomTile,
          state: TileState.Burning
        }
        break
      }
    }
  }
  return newArray
}

const shouldCatchFire = (burningChance: number) => Math.random() < (burningChance / 100)

type SimulationProps = {
 terrain: TileConfigProps[][]
 burning: number
 ash: number
}

export const updateTerrainToNextStep = (
  width: number,
  height: number,
  terrain: TileConfigProps[][]
): SimulationProps => {
  const newTerrain: TileConfigProps[][] = []
  const ash = updateBurningToBurnedAndCount(width, height, terrain, newTerrain)
  const burning = updateNeighborsToBurningAndCount(width, height, terrain, newTerrain)

  return { terrain: newTerrain, ash, burning }
}

const updateBurningToBurnedAndCount = (width: number, height: number, terrain: TileConfigProps[][], newTerrain: TileConfigProps[][]): number => {
  let ash = 0
  for (let i = 0; i < height; i++) {
    const newRow: TileConfigProps[] = []
    for (let j = 0; j < width; j++) {
      let newTile: TileConfigProps = { ...terrain[i][j] }
    
      if (newTile.state !== TileState.Ash) {
        newTile.lifetime += 1
        if (newTile.state === TileState.Burning) {
          newTile.burningDuration -= 1
          if (newTile.burningDuration <= 0) {
            newTile.state = TileState.Ash
            ash += 1
          }
        }
      } else {
        ash += 1
      }
      newRow.push(newTile)
    }
    newTerrain.push(newRow)
  }
  return ash
}

const updateNeighborsToBurningAndCount = (width: number, height: number, terrain: TileConfigProps[][], newTerrain: TileConfigProps[][]): number => {
  let burning = 0
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const currentTile = terrain[i][j]
      if (currentTile.state === TileState.Burning) {
        const neighbors = [
          { row: i - 1, col: j },
          { row: i + 1, col: j },
          { row: i, col: j - 1 },
          { row: i, col: j + 1 }
        ]
        for (const neighbor of neighbors) {
          const { row, col } = neighbor
          if (row >= 0 && row < terrain.length && col >= 0 && col < terrain[row].length
            && terrain[row][col].state === TileState.Initial && newTerrain[row][col].state === TileState.Initial
            && shouldCatchFire(terrain[row][col].burnChance)
          ) {
            newTerrain[row][col] = {
              ...terrain[row][col],
              state: TileState.Burning
            }
            burning += 1
          }
        }
      }
    }
  }
  return burning
}
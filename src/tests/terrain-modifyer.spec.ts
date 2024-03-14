import TileConfigProps, { TileState } from "../models/terrainConfig";
import { handleTerrainGeneration, igniteRandomTiles, updateTerrainToNextStep, updateTile } from "../utils/terrain-modifyer";

describe("Terrain Tests", () => {
  const width = 10
  const height = 10
  const burningTilesQuantity = 2
  const tileConfig = {
    coordinates: {
      row: 0,
      col: 0,
    },
    temperature: 0,
    humidity: 0,
    burningDuration: 1,
    state: TileState.Initial,
    burnChance: 100,
    lifetime: 0
  }
  let terrain: TileConfigProps[][] = []

  it("Should build the terrain with correct width, height and filled with tileConfig content", () => {
    terrain = handleTerrainGeneration(width, height, tileConfig)
    expect(terrain.length).toEqual(height)
    expect(terrain[0].length).toEqual(width)
    expect(terrain.flat().every((tile, i) => 
      tile.coordinates.row === Math.floor(i / width) &&
      tile.coordinates.col === i % width &&
      tile.temperature === tileConfig.temperature &&
      tile.humidity === tileConfig.humidity &&
      tile.state === tileConfig.state &&
      tile.burningDuration === tileConfig.burningDuration &&
      tile.lifetime === tileConfig.lifetime
    )).toBe(true)
  })

  it('should ignite the specified quantity of random tiles', () => {
    terrain = igniteRandomTiles(width, height, burningTilesQuantity, terrain)
    const burningTilesCount = terrain.flat().filter(tile => tile.state === TileState.Burning).length

    expect(burningTilesCount).toBe(burningTilesQuantity)
  })

  it('should ash the burning tiles and ignite neighbors tiles (100% burning rate)', () => {
    const data = updateTerrainToNextStep(width, height, terrain)
    terrain = data.terrain

    // burning tiles become ash tiles
    expect(data.ash).toEqual(burningTilesQuantity)
    // if random ignite corner tiles, it at least can get 2 * burningTielesQuantity
    expect(data.burning).toBeGreaterThanOrEqual(burningTilesQuantity * 2)
    // and max 4 * burningTielesQuantity
    expect(data.burning).toBeLessThanOrEqual(burningTilesQuantity * 4)
  })

  it('should remain only ash tiles in the end (100% burning rate)', () => {
    let data = updateTerrainToNextStep(width, height, terrain)
    terrain = data.terrain
    while (data.burning > 0) {
      data = updateTerrainToNextStep(width, height, terrain)
      terrain = data.terrain
    }
    expect(data.burning).toEqual(0)
    expect(data.ash).toEqual(width * height)
  })

  it('should update wanted fields in the correct tile', () => {
    const coordinates = { row: 0, col: 0 }
    const newTile = {
      temperature: 15,
      humidity: 50,
      burningDuration: 1,
      state: TileState.Burning,
      burnChance: 30
    }
    terrain = updateTile(terrain, coordinates, newTile)
    const { state, temperature, humidity, burnChance, burningDuration } = terrain[coordinates.row][coordinates.col]
    expect(state).toEqual(TileState.Burning)
    expect(temperature).toEqual(newTile.temperature)
    expect(humidity).toEqual(newTile.humidity)
    expect(burnChance).toEqual(newTile.burnChance)
    expect(burningDuration).toEqual(newTile.burningDuration)
  })
  
  it('should build the terrain wanted fields in the correct tile', () => {
    const coordinates = { row: 0, col: 0 }
    const newTile = {
      temperature: 15,
      humidity: 50,
      burningDuration: 1,
      state: TileState.Burning,
      burnChance: 30
    }
    terrain = updateTile(terrain, coordinates, newTile)
    const { state, temperature, humidity, burnChance, burningDuration } = terrain[coordinates.row][coordinates.col]
    expect(state).toEqual(TileState.Burning)
    expect(temperature).toEqual(newTile.temperature)
    expect(humidity).toEqual(newTile.humidity)
    expect(burnChance).toEqual(newTile.burnChance)
    expect(burningDuration).toEqual(newTile.burningDuration)
  })
})


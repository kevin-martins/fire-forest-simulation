import { TileState } from '../models/terrainConfig';
import tileReducer, {
  setTemperature,
  setHumidity,
  setState,
  setBurningDuration,
  setLifeTime,
  setBurnChance
} from './tileSlice';

describe('Tile reducer', () => {
  const initialState = {
    coordinates: {
      row: 0,
      col: 0,
    },
    temperature: 22,
    humidity: 36,
    burningDuration: 1,
    burnChance: 50,
    state: TileState.Initial,
    lifetime: 0
  }

  it('should handle initial state', () => {
    expect(tileReducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  it('should handle setTemperature', () => {
    const random = Math.round(Math.random() * 10)
    const actual = tileReducer(initialState, setTemperature(random))
    expect(actual.temperature).toEqual(random)
  })

  it('should handle setHumidity', () => {
    const random = Math.round(Math.random() * 10)
    const actual = tileReducer(initialState, setHumidity(random))
    expect(actual.humidity).toEqual(random)
  })

  it('should handle setState', () => {
    [TileState.Initial, TileState.Burning, TileState.Ash].forEach(state => {
      const actual = tileReducer(initialState, setState(state))
      expect(actual.state).toEqual(state)
    })
  })

  it('should handle setBurningDuration', () => {
    const random = Math.round(Math.random() * 10)
    const actual = tileReducer(initialState, setBurningDuration(random))
    expect(actual.burningDuration).toEqual(random)
  })

  it('should handle setLifeTime', () => {
    const random = Math.round(Math.random() * 10)
    const actual = tileReducer(initialState, setLifeTime(random))
    expect(actual.lifetime).toEqual(random)
  })

  it('should handle setBurnChance', () => {
    const random = Math.round(Math.random() * 10)
    const actual = tileReducer(initialState, setBurnChance(random))
    expect(actual.burnChance).toEqual(random)
  })
})

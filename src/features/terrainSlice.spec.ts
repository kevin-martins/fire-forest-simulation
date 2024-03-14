import GameState from '../models/gameState';
import PlayModeState from '../models/playModeState';
import { createNotif, removeNotificationById } from '../utils/utils';
import terrainReducer, {
  setWidth,
  setHeight,
  setGameState,
  setHoverTile,
  setBurningTiles,
  setAshTiles,
  setAutoIgniteQuantity,
  addNotification,
  removeNotification
} from './terrainSlice';

describe('Terrain reducer', () => {
  const initialState = {
    width: 10,
    height: 10,
    terrain: [],
    gameState: GameState.Config,
    playMode: PlayModeState.Step,
    hoverTile: false,
    notifications: [],
    burningTiles: 0,
    ashTiles: 0,
    autoIgniteQuantity: 20
  }

  it('should handle initial state', () => {
    expect(terrainReducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  it('should handle setWidth', () => {
    const random = Math.round(Math.random() * 10)
    const actual = terrainReducer(initialState, setWidth(random))
    expect(actual.width).toEqual(random)
  })

  it('should handle setHeight', () => {
    const random = Math.round(Math.random() * 10)
    const actual = terrainReducer(initialState, setHeight(random))
    expect(actual.height).toEqual(random)
  })

  it('should handle setGameState', () => {
    [GameState.Running, GameState.End].forEach(state => {
      const actual = terrainReducer(initialState, setGameState(state))
      expect(actual.gameState).toEqual(state)
    })
  })

  it('should handle setHoverTile', () => {
    const actual = terrainReducer(initialState, setHoverTile(true))
    expect(actual.hoverTile).toEqual(true)
  })

  it('should handle setBurningTiles', () => {
    const random = Math.round(Math.random() * 10)
    const actual = terrainReducer(initialState, setBurningTiles(random))
    expect(actual.burningTiles).toEqual(random)
  })

  it('should handle setAshTiles', () => {
    const random = Math.round(Math.random() * 10)
    const actual = terrainReducer(initialState, setAshTiles(random))
    expect(actual.ashTiles).toEqual(random)
  })

  it('should handle setAutoIgniteQuantity', () => {
    const random = Math.round(Math.random() * 10)
    const actual = terrainReducer(initialState, setAutoIgniteQuantity(random))
    expect(actual.autoIgniteQuantity).toEqual(random)
  })

  it('should handle addNotification (always add at index 0)', () => {
    [createNotif('first', true), createNotif('second')].forEach(notif => {
      const actual = terrainReducer(initialState, addNotification(notif))
      const { text, isError } = actual.notifications[0]
      expect(text).toEqual(notif.text)
      expect(isError).toEqual(notif.isError)
    })
  })

  it('should handle removeNotification', () => {
    const notifications = [
      { id: 1, text: 'Notification 1', isError: true },
      { id: 2, text: 'Notification 2', isError: true },
      { id: 3, text: 'Notification 3', isError: false }
    ]

    const actual = terrainReducer(initialState, removeNotification(removeNotificationById(notifications, 2)))
    expect(actual.notifications).toEqual([
      { id: 1, text: 'Notification 1', isError: true },
      { id: 3, text: 'Notification 3', isError: false }
    ])
  })
})

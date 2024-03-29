import NotificationProps from "../models/notification";
import PlayModeState from "../models/playModeState";
import { TileState } from "../models/terrainConfig";

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const randomNumberRange = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const tileStateToText = (state: TileState) => {
  switch (state) {
    case TileState.Initial: return 'Initial'
    case TileState.Burning: return 'Burning'
    case TileState.Ash: return 'Burned'
    default: return 'None'
  }
}

export const simulationStateToText = (state: PlayModeState) => {
  switch (state) {
    case PlayModeState.Auto: return 'Auto'
    case PlayModeState.Step: return 'Step by step'
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

export const checkConfigChanges = (savePreviousInputs: any, currentInuts: any) =>  {
  return Object.keys(savePreviousInputs).some(key => {
    return (savePreviousInputs as any)[key] !== (currentInuts as any)[key]
  })
}

export const createNotif = (text: string, isError: boolean = false): NotificationProps => {
  const randomId: number = Math.round(Math.random() * 10000)
  return { id: randomId, isError, text }
}

export const removeNotificationById = (notifications: NotificationProps[], id: number) => notifications.filter((n) => n.id !== id)
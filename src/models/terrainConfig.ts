export type TileConfigProps = {
  coordinates: {
    row: number,
    col: number
  }
  temperature: number
  humidity: number
  state: TileState
  burningDuration: number
  lifetime: number
}

export enum TileState {
  None,
  Fire,
  Ash
}

export default TileConfigProps
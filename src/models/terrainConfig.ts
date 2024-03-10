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
  Initial,
  Burning,
  Ash
}

export default TileConfigProps
export type TerrainConfigProps = {
  coordinates: number[]
  temperature: number
  humidity: number
  state: TerrainState
}

export enum TerrainState {
  None,
  Fire,
  Ash
}

export default TerrainConfigProps
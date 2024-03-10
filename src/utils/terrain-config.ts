import TileConfigProps from "../models/terrainConfig";

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

export const handleTerrainGeneration = (width: number, height: number, tileConfig: TileConfigProps): TileConfigProps[][] => {
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
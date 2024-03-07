import { useEffect, useState } from "react";
import TerrainConfigProps, { TerrainState } from "../models/terrainConfig";
import { temperatureColor } from "../utils/terrain-config";
import TerrainSquare from "./TerrainSquare";

const initialTerrainConfig = {
  coordinates: [],
  temperature: 0,
  humidity: 0,
  state: TerrainState.None
}

const App = () => {
  const [width, setWidth] = useState<number>(15)
  const [height, setHeight] = useState<number>(15)
  const [terrainConfig, setTerrainConfig] = useState<TerrainConfigProps>(initialTerrainConfig)
  const [terrain, setTerrain] = useState<TerrainConfigProps[][]>([]);

  const handleWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(Number(event.target.value))
  }

  const handleHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(Number(event.target.value))
  }

  const handleTerrainGeneration = () => {
    const newTerrain: TerrainConfigProps[][] = []
    for (let i = 0; i < height; i++) {
      const row: TerrainConfigProps[] = []
      for (let j = 0; j < width; j++) {
        const config: TerrainConfigProps = {
          ...terrainConfig,
          coordinates: [i, j],
          temperature: 19,
          humidity: 1
        }
        row.push({ ...config })
      }
      newTerrain.push(row)
    }
    setTerrain(newTerrain)
  }

  const handleTerrainConfigChanges = (cell: TerrainConfigProps) => {
    const [row, col] = cell.coordinates
    const newTerrain = terrain.slice();
    // Update the specific cell with newValue
    newTerrain[row] = newTerrain[row].slice();
    newTerrain[row][col] = { ...cell, state: TerrainState.Fire };
    // Update the state with the modified terrain array
    setTerrain(newTerrain);
  }

  useEffect(() => {
    handleTerrainGeneration()
  },[])

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <main className="bg-slate-800 h-screen">
        {terrain.map(row => {
          return (
            <div className="flex flex-row">
              {row.map(cell => {
                return (
                  <TerrainSquare {...cell} />
                )
              })}
            </div>
          )
        })}
        <div>
          <h1>Terrain Configuration</h1>
        </div>
        <label>
          Width:
          <input type="number" value={width} onChange={handleWidthChange} />
        </label>
        <br />
        <label>
          Height:
          <input type="number" value={height} onChange={handleHeightChange} />
        </label>
        <br />
        <button onClick={handleTerrainGeneration}>Apply Changes</button>
        <p>Width: {width}</p>
        <p>Height: {height}</p>
      </main>
    </div>
  );
}

export default App;

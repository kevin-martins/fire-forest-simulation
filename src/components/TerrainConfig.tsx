import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setHeight, setTerrain, setWidth } from '../features/terrainSlice';
import TileConfigProps from '../models/terrainConfig';
import { RootState } from '../app/store';
import InputNumber from './InputNumber';
import Button from './Button';
import DropDown from './DropDown';

const TerrainConfig = () => {
  const { width, height } = useSelector((state: RootState) => state.terrainConfig)
  const tileConfig = useSelector((state: RootState) => state.tileConfig)
  const dispatch = useDispatch()

  const handleTerrainGeneration = () => {
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
    dispatch(setTerrain(newTerrain))
  }

  useEffect(() => {
    handleTerrainGeneration()
  }, [])

  return (
    <div className='flex flex-col'>
      <h1 className='text-white text-lg font-medium'>Terrain Configuration</h1>
      <InputNumber title='Width' description='the width of the terrain' value={width} reduxFunction={setWidth} />
      <InputNumber title='Height' description='the height of the terrain' value={height} reduxFunction={setHeight} />
      <DropDown />
      {/* <Button text='Buil the Terrain' handleClick={handleTerrainGeneration} /> */}
    </div>
  )
}

export default TerrainConfig
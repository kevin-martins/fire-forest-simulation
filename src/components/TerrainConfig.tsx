import { useSelector } from 'react-redux';
import { setHeight, setWidth } from '../features/terrainSlice';
import { RootState } from '../app/store';
import InputNumber from './InputNumber';
import DropDown from './DropDown';

const TerrainConfig = () => {
  const { width, height } = useSelector((state: RootState) => state.terrainConfig)

  return (
    <div className='flex flex-col'>
      <h1 className='text-white text-lg font-medium -translate-x-5'>Terrain Configuration</h1>
      <InputNumber
        id='width'
        title='Width'
        description='the width of the terrain'
        value={width}
        range={{ min: 10, max: 100 }}
        reduxFunction={setWidth}
        unit='tiles'
      />
      <InputNumber
        id='height'
        title='Height'
        description='the height of the terrain'
        value={height}
        range={{ min: 10, max: 100 }}
        reduxFunction={setHeight}
        unit='tiles'
      />
      <DropDown />
    </div>
  )
}

export default TerrainConfig
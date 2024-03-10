import { useSelector } from 'react-redux';
import { setHeight, setWidth } from '../features/terrainSlice';
import { RootState } from '../app/store';
import InputNumber from './InputNumber';
import DropDown from './DropDown';

const TerrainConfig = () => {
  const { width, height } = useSelector((state: RootState) => state.terrainConfig)

  return (
    <div className='flex flex-col'>
      <h1 className='text-white text-lg font-medium'>Terrain Configuration</h1>
      <InputNumber title='Width' description='the width of the terrain' value={width} reduxFunction={setWidth} />
      <InputNumber title='Height' description='the height of the terrain' value={height} reduxFunction={setHeight} />
      <DropDown />
    </div>
  )
}

export default TerrainConfig
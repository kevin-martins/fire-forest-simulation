import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { setBurningDuration, setHumidity, setTemperature } from '../features/tileSlice';
import InputNumber from './InputNumber';

const TileConfig = () => {
  const { temperature, humidity, burningDuration } = useSelector((state: RootState) => state.tileConfig)

  return (
    <div className='flex flex-col'>
      <h1 className='text-white text-lg font-medium'>Tile Configuration</h1>
      <InputNumber title='Temperature' description='the temperature must be between -20 and 50°C' value={temperature} reduxFunction={setTemperature} unit='°C' />
      <InputNumber title='Humidity' description='the humidity must be between 0 and 100%' value={humidity} reduxFunction={setHumidity} unit='%' />
      <InputNumber title='Burning Duration' description='the time required for the tile to become ash after being on fire' value={burningDuration} reduxFunction={setBurningDuration} unit='turn' />
    </div>
  )
}

export default TileConfig

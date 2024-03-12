import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { setBurnChance, setBurningDuration, setHumidity, setTemperature } from '../features/tileSlice';
import InputNumber from './InputNumber';

const TileConfig = () => {
  const {
    temperature,
    humidity,
    burningDuration,
    burnChance
  } = useSelector((state: RootState) => state.tileConfig)

  return (
    <div className='flex flex-col'>
      <h1 className='text-white text-lg font-medium -translate-x-5'>Tile Configuration</h1>
      <InputNumber
        id='temperature'
        title='Temperature'
        description='temperature value from -20 to 50'
        value={temperature} reduxFunction={setTemperature}
        unit='°C'
      />
      <InputNumber
        id='humidity'
        title='Humidity'
        description='humidity value from 0 to 100%'
        value={humidity}
        reduxFunction={setHumidity}
        unit='%'
      />
      <InputNumber
        id='burning-duration'
        title='Burning Duration'
        description='time required for a burning tile to become ash'
        value={burningDuration}
        reduxFunction={setBurningDuration}
        unit='turn'
      />
      <InputNumber
        id='burning-rate'
        title='Burning Rate'
        description='chance for a tile to get ignite from 0 to 100'
        value={burnChance}
        reduxFunction={setBurnChance}
        unit='%'
      />
    </div>
  )
}

export default TileConfig

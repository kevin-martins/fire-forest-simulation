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
        description='temperature value'
        value={temperature}
        range={{ min: -20, max: 50 }}
        reduxFunction={setTemperature}
        unit='°C'
        error
      />
      <InputNumber
        id='humidity'
        title='Humidity'
        description='humidity value'
        value={humidity}
        range={{ min: 0, max: 100 }}
        reduxFunction={setHumidity}
        unit='%'
        error
      />
      <InputNumber
        id='burning-duration'
        title='Burning Duration'
        description='time required for a burning tile to become ash'
        value={burningDuration}
        range={{ min: 1 }}
        reduxFunction={setBurningDuration}
        unit='turns'
      />
      <InputNumber
        id='burning-rate'
        title='Burning Rate'
        description='chance for a tile to get ignite'
        value={burnChance}
        range={{ min: 1, max: 100 }}
        reduxFunction={setBurnChance}
        unit='%'
      />
    </div>
  )
}

export default TileConfig

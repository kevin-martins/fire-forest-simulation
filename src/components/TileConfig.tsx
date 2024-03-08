import { useSelector } from 'react-redux'
import { RootState } from '../app/store'
import { setBurningDuration, setHumidity, setState, setTemperature } from '../features/tileSlice'
import InputNumber from './InputNumber'

const TileConfig = () => {
  const { temperature, humidity, state, burningDuration } = useSelector((state: RootState) => state.tileConfig)

  return (
    <div className='grid grid-cols-1'>
      <h1>Tile Configuration</h1>
      <InputNumber title='Temperature' description='the temperature must be between -20 and 50°C' value={temperature} reduxFunction={setTemperature} />
      <InputNumber title='Humidity' description='the humidity must be between 0 and 1' value={humidity} reduxFunction={setHumidity} step={0.1} />
      <InputNumber title='Burning Duration' description='the time required for the tile to become ash after being on fire' value={burningDuration} reduxFunction={setBurningDuration} />
    </div>
  )
}

export default TileConfig

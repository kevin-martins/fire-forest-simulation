import { BsFire } from 'react-icons/bs';
import { MdOutlineLensBlur } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import GameState from '../models/gameState';

const SimulationStats = () => {
  const { height, width, burningTiles, ashTiles, gameState } = useSelector((state: RootState) => state.terrainConfig)
  return (
    <>
      <div className='flex flex-row gap-2 my-auto text-slate-200 font-light'>
        <span className='items-center'>{height * width} tiles:</span>
        <div className='flex gap-1'>
          <div className='my-auto w-5 h-5 rounded bg-green-600' />
          <span className='items-center h-full my-auto'>{height * width - ashTiles - burningTiles} Intact</span>
        </div>
        <div className='flex gap-1'>
          <div className='my-auto w-5 h-5 rounded bg-yellow-600'>
            <BsFire className='w-5 h-5 m-auto text-red-600 animate-bounce' />
          </div>
          <span className='items-center'>{burningTiles} Burning</span>
        </div>
        <div className='flex gap-1'>
          <div className='my-auto w-5 h-5 rounded bg-gray-600'>
            <MdOutlineLensBlur className='w-5 h-5 m-auto rounded' />
          </div>
          <span className='items-center'>{ashTiles} Burned</span>
        </div>
      </div>
      {gameState !== GameState.Config && <span className='text-slate-100'>{Math.round((ashTiles / (height * width)) * 10000) / 100}% of the terrain has been burned</span>}
    </>
  )
}

export default SimulationStats

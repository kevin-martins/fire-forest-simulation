import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import TileConfigProps, { TileState } from '../models/terrainConfig';
import { AnimatePresence, motion } from 'framer-motion';
import { temperatureColor } from '../utils/terrain-config';
import { tileStateToText } from '../utils/utils';
import { setHoverTile, setTerrain } from '../features/terrainSlice';
import { BsFire } from "react-icons/bs";
import GameState from '../models/gameState';

const TileInfo = (tile: TileConfigProps) => {
  return (
    <motion.div
      layout
      initial={{ y: -15, scale: 0.95 }}
      animate={{ y: 0, scale: 1 }}
      exit={{ scale: .4, opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="absolute w-max top-14 z-10 p-2 rounded gap-2 text-base shadow-lg text-white bg-slate-600 pointer-events-auto"
    >
      <div>
        <p>Temperature: {tile.temperature} °C</p>
        <p>Humidity: {tile.humidity * 100}%</p>
        <p>Burning: {tile.burningDuration} turn</p>
        <p>State: {tileStateToText(tile.state)}</p>
      </div>
    </motion.div>
  )
}

const modifyObjectProps = (
  terrain: TileConfigProps[][], 
  coordinates: { row: number, col: number }, 
  newProps: Partial<TileConfigProps>
): TileConfigProps[][] => {
  const newArray = terrain.map((row) => [...row])
  const { row, col } = coordinates
  if (row >= 0 && row < newArray.length && col >= 0 && col < newArray[row].length) {
    newArray[row][col] = {
      ...newArray[row][col],
      ...newProps
    }
  }
  return newArray
}

const Tile = (tile: TileConfigProps) => {
  const { terrain, gameState, hoverTile } = useSelector((state: RootState) => state.terrainConfig)
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const dispatch = useDispatch()

  const handleEnter = () => {
    setIsHovered(true)
  }

  const handleLeave = ()=> {
    setIsHovered(false)
  }

  const handleClick = () => {
    if (gameState === GameState.Fire && tile.state === TileState.Burning) {
      const updatedTerrain = modifyObjectProps(terrain, tile.coordinates, { state: TileState.Burning })
      dispatch(setTerrain(updatedTerrain))
    } else if (gameState === GameState.Fire) {
      const updatedTerrain = modifyObjectProps(terrain, tile.coordinates, { state: TileState.Burning })
      dispatch(setTerrain(updatedTerrain))
    }
  }

  return (
    <div className='relative'>
      <button
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onClick={handleClick}
        className={`w-6 h-6 rounded ${temperatureColor(tile.temperature)}`}
      >
        {tile.state === TileState.Burning && <BsFire className='w-6 h-6 m-auto text-red-600 animate-bounce' />}
        {isHovered && tile.state !== TileState.Burning && gameState === GameState.Fire && <BsFire className='w-6 h-6 m-auto text-red-600/50 animate-pulse' />}
        {tile.state === TileState.Ash && <BsFire className='w-6 h-6 m-auto text-black' />}
      </button>
      <AnimatePresence>
        {isHovered && hoverTile && <TileInfo {...tile} />}
      </AnimatePresence>
    </div>
  )
}

const Terrain = () => {
  const { terrain, height, width } = useSelector((state: RootState) => state.terrainConfig)
  const dispatch = useDispatch()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setHoverTile(event.target.checked))
  }

  return (
    <div className="w-1/2 mx-auto ml-5">
      <div className=''>
        {terrain.map((row: TileConfigProps[], i: number) => (
          <div key={i} className="flex flex-row gap-1">
            {row.map((tile, i: number) => (
              <Tile key={i} {...tile} />
            ))}
          </div>
        ))}
      </div>
      <div className='flex'>
        <div className="inline-flex items-center">
          <label className="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="check">
            <input
              onChange={handleChange}
              type="checkbox"
              className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-slate-200 before:opacity-0 before:transition-opacity checked:border-slate-600 checked:bg-slate-600 checked:before:bg-slate-600 hover:before:opacity-10"
              id="check"
            />
            <span
              className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                stroke="currentColor" stroke-width="1">
                <path fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"></path>
              </svg>
            </span>
          </label>
          <label className="mt-px font-light text-slate-300 cursor-pointer select-none" htmlFor="check">
            hover over the tile to view its parameters
          </label>
        </div>
        <p className='px-3 inline-flex items-center text-slate-300 font-light'>{height * width} tiles</p>
        <p className='inline-flex items-center text-slate-300 font-light'></p>
      </div>
    </div>
  )
}

export default Terrain

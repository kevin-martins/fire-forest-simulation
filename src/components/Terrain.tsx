import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import TileConfigProps, { TileState } from '../models/terrainConfig';
import { AnimatePresence, motion } from 'framer-motion';
import { updateTile } from '../utils/terrain-config';
import { getBackgroundColor, tileStateToText } from '../utils/utils';
import { setBurningTiles, setHoverTile, setTerrain } from '../features/terrainSlice';
import { BsFire } from "react-icons/bs";
import { HiArrowNarrowDown, HiArrowNarrowLeft, HiArrowNarrowRight, HiArrowNarrowUp } from "react-icons/hi";
import { MdOutlineLensBlur } from 'react-icons/md';
import GameState from '../models/gameState';
import SimulationStats from './SimulationStats';
import CheckBox from './CheckBox';

const TileInfo = (tile: TileConfigProps) => {
  return (
    <motion.div
      layout
      initial={{ y: -15, scale: 0.95 }}
      animate={{ y: 0, scale: 1 }}
      exit={{ scale: .4, opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="absolute w-max top-14 z-50 p-2 rounded gap-2 text-base shadow-lg text-white bg-slate-600 pointer-events-auto"
    >
      <div>
        <p>Temperature: {tile.temperature} °C</p>
        <p>Humidity: {tile.humidity}%</p>
        <p>Burning: {tile.burningDuration} turn</p>
        <p>State: {tileStateToText(tile.state)}</p>
        <p>Burn rate: {tile.burnChance} %</p>
        <p>Lifetime: {tile.lifetime} turn</p>
      </div>
    </motion.div>
  )
}

const Tile = (tile: TileConfigProps) => {
  const { terrain, hoverTile, gameState, burningTiles } = useSelector((state: RootState) => state.terrainConfig)
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const dispatch = useDispatch()

  const handleEnter = () => {
    setIsHovered(true)
  }

  const handleLeave = ()=> {
    setIsHovered(false)
  }

  // Get Burning tiles Neighbors, display arrow to it if in Initial state
  const nextFireMove = () => {
    const { row, col } = tile.coordinates
    if (tile.state === TileState.Burning) {
      const neighbors = [
        { row: row - 1, col: col },//up
        { row: row + 1, col: col },//down
        { row: row, col: col - 1 },//left
        { row: row, col: col + 1 } //right
      ]

      return neighbors.reduce((acc: JSX.Element[], curr, i) => {
        const { row, col } = curr
        if (row >= 0 && row < terrain.length && col >= 0 && col < terrain[row].length
          && terrain[row][col].state === TileState.Initial
        ) {
          if (i === 0) {
            // Arrow Up
            acc.push(<HiArrowNarrowUp className='absolute z-10 -top-4 right-1 scale-150 pointer-events-none' />)
          } else if (i === 1) {
            // Arrow Down
            acc.push(<HiArrowNarrowDown className='absolute z-10 -bottom-4 left-1 scale-150 pointer-events-none' />)
          } else if (i === 2) {
            // Arrow Left
            acc.push(<HiArrowNarrowLeft className='absolute z-10 scale-150 right-6 top-1 pointer-events-none' />)
          } else {
            // Arrow Down
            acc.push(<HiArrowNarrowRight className='absolute z-10 scale-150 left-6 top-1 pointer-events-none' />)
          }
        }
        return acc
      }, [])
    }
  }

  const handleClick = () => {
    if (gameState === GameState.Config) {
      if (tile.state === TileState.Burning) {
        const updatedTerrain = updateTile(terrain, tile.coordinates, { state: TileState.Initial })
        dispatch(setTerrain(updatedTerrain))
        dispatch(setBurningTiles(burningTiles - 1))
      } else if (tile.state === TileState.Initial) {
        const updatedTerrain = updateTile(terrain, tile.coordinates, { state: TileState.Burning })
        dispatch(setTerrain(updatedTerrain))
        dispatch(setBurningTiles(burningTiles + 1))
      }
    }
  }

  const tileIcon = () => {
    const fadeFireIcon = <BsFire className='w-6 h-6 m-auto text-red-600/50 animate-bounce' />
    const plainFireIcon = <BsFire className='w-6 h-6 m-auto text-red-600 animate-bounce relative z-30' />
    if (gameState === GameState.Config) {
      if (!isHovered && tile.state === TileState.Burning) {
        return plainFireIcon
      } else if ((isHovered && tile.state === TileState.Burning) || (isHovered && tile.state === TileState.Initial)) {
        return fadeFireIcon
      }
    } else {
      if (tile.state === TileState.Burning) {
        return plainFireIcon
      } else if (tile.state === TileState.Ash) {
        return <MdOutlineLensBlur className='w-6 h-6 m-auto rounded text-slate-200' />
      }
    }
  }

  return (
    <div className='relative'>
      <button
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onClick={handleClick}
        className={`relative w-6 h-6 rounded ${gameState !== GameState.Config && 'cursor-default'}`}
        style={{ backgroundColor: getBackgroundColor(tile.state) }}
      >
        {tileIcon()}
        {nextFireMove()}
      </button>
      <AnimatePresence>
        {isHovered && hoverTile && <TileInfo {...tile} />}
      </AnimatePresence>
    </div>
  )
}

const Terrain = () => {
  const { terrain } = useSelector((state: RootState) => state.terrainConfig)
  const dispatch = useDispatch()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("click")
    dispatch(setHoverTile(event.target.checked))
  }

  return (
    <div className="mx-auto ml-5">
      <div className=''>
        {terrain.map((row: TileConfigProps[], i: number) => (
          <div key={i} className="flex flex-row gap-1">
            {row.map((tile, i: number) => (
              <Tile key={i} {...tile} />
            ))}
          </div>
        ))}
      </div>
      <CheckBox text='hover over a tile to view its parameters' handleChange={handleChange} />
      <SimulationStats />
    </div>
  )
}

export default Terrain

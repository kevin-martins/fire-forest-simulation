import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store'
import TileConfigProps from '../models/terrainConfig'
import { AnimatePresence, motion } from 'framer-motion'
import { temperatureColor } from '../utils/terrain-config'
import { tileStateToText } from '../utils/utils'

const TileInfo = (terrain: TileConfigProps) => {
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
        <p>Coordonnées: x {terrain.coordinates.row}</p>
        <p className="text-right">y {terrain.coordinates.col}</p>
        <p className="">Temperature: {terrain.temperature}</p>
        <p>Humidité: {terrain.humidity * 100}%</p>
        <p>Etat: {tileStateToText(terrain.state)}</p>
      </div>
    </motion.div>
  )
}

const Tile = (terrain: TileConfigProps) => {
  const [detailPanel, setDetailPanel] = useState<boolean>(false)

  return (
    <div className='relative'>
      <button
        onClick={() => setDetailPanel(prev => !prev)}
        className={`w-12 h-12 ${temperatureColor(terrain.temperature)} m-1`}
      >
        {terrain.coordinates.row}{terrain.coordinates.col}
      </button>
      <AnimatePresence>
        {detailPanel && <TileInfo {...terrain} />}
      </AnimatePresence>
    </div>
  )
}

const Terrain = () => {
  const terrain = useSelector((state: RootState) => state.terrainConfig.terrain)

  return (
    <div className="grid place-content-center ">
      {terrain.map((row: TileConfigProps[], i: number) => {
        return (
          <div key={i} className="flex flex-row">
            {row.map((cell, i: number) => {
              return (
                <Tile key={i} {...cell} />
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default Terrain

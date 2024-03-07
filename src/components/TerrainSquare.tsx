import { useState } from 'react'
import { AnimatePresence } from "framer-motion";
import TerrainDetails from "./TerrainInfoPanel";
import TerrainConfigProps from '../models/terrainConfig';
import { temperatureColor } from '../utils/terrain-config';

const TerrainSquare = (terrain: TerrainConfigProps) => {
  const [detailPanel, setDetailPanel] = useState<Boolean>(false)

  return (
    <div className='relative'>
      <button
        onClick={() => setDetailPanel(prev => !prev)}
        className={`w-5 h-5 ${temperatureColor(terrain.temperature)} m-1`}
      >
        {terrain.coordinates[0]}{terrain.coordinates[1]}
      </button>
      <AnimatePresence>
        {detailPanel && <TerrainDetails />}
      </AnimatePresence>
    </div>
  )
}

export default TerrainSquare

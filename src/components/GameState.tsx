import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store'
import SimulationState from '../models/simulationState'
import { simulationStateToText } from '../utils/utils'

const GameState = () => {
  const state = useSelector((state: RootState) => state.terrainConfig.simulationState)

  return (
    <div>
      <h1>Current state {simulationStateToText(state)}</h1>
      {state === SimulationState.Init && <p>click on tiles to make them on fire for the simulation</p>}
    </div>
  )
}

export default GameState

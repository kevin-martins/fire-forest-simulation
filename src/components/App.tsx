import { useEffect, useState } from "react";
import Terrain from "./Terrain";
import TerrainConfig from "./TerrainConfig";
import TileConfig from "./TileConfig";
import GameStateList from "./GameStateList";
import Button from "./Button";
import GameState from '../models/gameState'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { setAshTiles,setBurningTiles, setTerrain, setGameState, addNotification } from "../features/terrainSlice";
import { updateTerrainToNextStep, handleTerrainGeneration } from "../utils/terrain-modifyer";
import PlayModeState from "../models/playModeState";
import { FaForwardStep } from "react-icons/fa6";
import { MdAutorenew } from "react-icons/md";
import IgniteConfig from "./IgniteConfig";
import { checkConfigChanges, createNotif } from "../utils/utils";
import SendNotifications from "./SendNotifications";

const App = () => {
  const {
    width,
    height,
    terrain,
    burningTiles,
    ashTiles,
    gameState,
    playMode
  } = useSelector((state: RootState) => state.terrainConfig)
  const tileConfig = useSelector((state: RootState) => state.tileConfig)
  const [savePreviousInputs, setSavePreviousInputs] = useState({
    width,
    height,
    temperature: tileConfig.temperature,
    humidity: tileConfig.humidity,
    burningDuration: tileConfig.burningDuration,
    burnChance: tileConfig.burnChance
  })
  const dispatch = useDispatch()

  const handleBuild = () => {
    const newConfig = {
      width,
      height,
      temperature: tileConfig.temperature,
      humidity: tileConfig.humidity,
      burningDuration: tileConfig.burningDuration,
      burnChance: tileConfig.burnChance
    }
    if (checkConfigChanges(savePreviousInputs, newConfig)) {
      dispatch(setTerrain(handleTerrainGeneration(width, height, tileConfig)))
      dispatch(addNotification(createNotif("Changes has been successfully applied")))
      setSavePreviousInputs(newConfig)
      dispatch(setGameState(GameState.Config))
    } else if ((burningTiles > 0 || ashTiles > 0)) {
      dispatch(setTerrain(handleTerrainGeneration(width, height, tileConfig)))
      dispatch(addNotification(createNotif("The terrain has been successfully rebuild")))
      dispatch(setBurningTiles(0))
      dispatch(setAshTiles(0))
      dispatch(setGameState(GameState.Config))
    } else {
      dispatch(addNotification(createNotif("Nothing has been changed", true)))
    }
  }

  const nextSimulationStep = () => {
    const data = updateTerrainToNextStep(width, height, terrain)
    dispatch(setTerrain(data.terrain))
    dispatch(setBurningTiles(data.burning))
    dispatch(setAshTiles(data.ash))
    if (data.burning === 0) {
      dispatch(setGameState(GameState.End))
    }
  }

  const handleStart = () => {
    if (burningTiles > 0) {
      if (gameState === GameState.Running) {
        nextSimulationStep()
      } else if (gameState === GameState.Config) {
        nextSimulationStep()
        dispatch(setGameState(GameState.Running))
      }
    } else {
      if (gameState === GameState.End) {
        dispatch(addNotification(createNotif("There is no more tile to burn", true)))
      } else if (gameState === GameState.Running) {
        dispatch(setGameState(GameState.End))
      } else {
        dispatch(addNotification(createNotif("There is no burning tile in the scene", true)))
      }
    }
  }

  const startButtonDecoration = () => {
    if (gameState === GameState.Running) {
      if (playMode === PlayModeState.Step) {
        return <MdAutorenew id='step-icon' className="animate-spin" />
      } else if (playMode === PlayModeState.Auto) {
        return <FaForwardStep id='auto-icon' className="animate-bounce" />
      }
    }
    return <p id='start-text'>Start</p>
  }

  useEffect(() => {
    dispatch(setTerrain(handleTerrainGeneration(width, height, tileConfig)))
    // eslint-disable-next-line
  }, [])

  return (
    <div className="bg-slate-900 h-screen">
      <header className="max-w-4xl mx-auto mb-12">
        <h1 className="text-center text-3xl font-medium text-white pt-8 mb-4">Fire Simulation</h1>
        <p className="text-slate-300 text-center">
          This is a simple simulation of the spread of fire in a terrain. Explore the dynamics of
          forest fires as they propagate through the landscape. Watch as the fire spreads, consuming vegetation
          and altering the terrain. Gain insights into the behavior of fires and their impact on ecosystems.
        </p>
      </header>
      <main className="bg-slate-900">
        <SendNotifications />
        <div className="container mx-auto flex lg:flex-row flex-col h-full place-items-center">
          <div className="pl-6 w-1/2 ml-auto">
            <GameStateList />
            <div className="">
              <div className="flex flex-row gap-5 mb-4 h-full">
                <TerrainConfig />
                <div className="my-auto h-72 mr-3 w-[.5px] bg-slate-400" />
                <TileConfig />
              </div>
            </div>
            <Button handleClick={handleBuild} style={{ margin: '0 0 0 auto' }}>
              <p>Build Terrain</p>
            </Button>
            <IgniteConfig />
            <Button handleClick={handleStart} style={{ margin: '5px 0 0 auto', padding: '15px 80px' }}>
              {startButtonDecoration()}
            </Button>
          </div>
          <Terrain />
        </div>
      </main>
    </div>
  );
}

export default App;

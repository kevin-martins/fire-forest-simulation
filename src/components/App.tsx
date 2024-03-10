import { FaPlay, FaRegPauseCircle, FaStepForward,  } from "react-icons/fa";
import Terrain from "./Terrain";
import TerrainConfig from "./TerrainConfig";
import TileConfig from "./TileConfig";
import GameState from "./GameState";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { setTerrain } from "../features/terrainSlice";
import { handleTerrainGeneration } from "../utils/terrain-config";
import { useEffect } from "react";

const App = () => {
  const { width, height } = useSelector((state: RootState) => state.terrainConfig)
  const tileConfig = useSelector((state: RootState) => state.tileConfig)
  const dispatch = useDispatch()

  const handleBuild = () => {
    dispatch(setTerrain(handleTerrainGeneration(width, height, tileConfig)))
  }

  useEffect(() => {
    handleBuild()
  }, [])

  return (
    <div>
      <header>
      </header>
      <main className="bg-slate-900 h-screen">
        <div className="container mx-auto grid grid-cols-2 h-full place-content-center">
          <div className="w-max">
            <GameState />
            <div className="w-max">
              <div className="flex flex-row gap-4 mb-4">
                <TerrainConfig />
                <div className="my-auto h-44 w-[.5px] bg-slate-400" />
                <TileConfig />
              </div>
            </div>
            <Button text='Buil the Terrain' handleClick={handleBuild} />
            <Button text='Buil the Terrain' handleClick={() => {}} />
          </div>
          <Terrain />
        </div>
          {/* <div className="flex flex-row gap-5 place-content-center mt-3">
            <button className="">
              <FaPlay className=" text-white" />
            </button>
            <button className="scale-150">
              <FaRegPauseCircle className=" text-white" />
            </button>
            <button className="">
              <FaStepForward className=" text-white" />
            </button>
          </div> */}
      </main>
    </div>
  );
}

export default App;

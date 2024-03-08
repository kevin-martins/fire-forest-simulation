import { FaPlay, FaRegPauseCircle, FaStepForward,  } from "react-icons/fa";
import Terrain from "./Terrain";
import TerrainConfig from "./TerrainConfig";
import TileConfig from "./TileConfig";
import GameState from "./GameState";

const App = () => {
  return (
    <div>
      <header>
      </header>
      <main className="bg-slate-800 h-screen">
        <div className="container mx-auto">
          <Terrain />
          <div className="flex flex-row gap-5 place-content-center mt-3">
            <button className="">
              <FaPlay className=" text-white" />
            </button>
            <button className="scale-150">
              <FaRegPauseCircle className=" text-white" />
            </button>
            <button className="">
              <FaStepForward className=" text-white" />
            </button>
            <GameState />
          </div>
          <div className="w-max">
            <div className="flex flex-row gap-4 mb-4">
              <TerrainConfig />
              <div className="my-auto h-44 w-[.5px] bg-slate-400" />
              <TileConfig />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

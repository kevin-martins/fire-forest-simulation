import { useDispatch, useSelector } from "react-redux"
import { addError, setAutoIgniteQuantity, setBurningTiles, setTerrain } from "../features/terrainSlice"
import GameState from "../models/gameState"
import { igniteRandomTiles } from "../utils/terrain-config"
import Button from "./Button"
import InputNumber from "./InputNumber"
import { RootState } from "../app/store"

const IgniteConfig = () => {
  const {
    width,
    height,
    terrain,
    burningTiles,
    gameState,
    autoIgniteQuantity
  } = useSelector((state: RootState) => state.terrainConfig)
  const dispatch = useDispatch()

  const handleIgniteTiles = () => {
    if (gameState === GameState.Config) {
      if (autoIgniteQuantity + burningTiles > width * height) {
        dispatch(addError("There is no tile to ignite"))
      } else {
        const data = igniteRandomTiles(width, height, autoIgniteQuantity, terrain)
        dispatch(setTerrain(data))
        dispatch(setBurningTiles(burningTiles + autoIgniteQuantity))
      }
    } else {
      console.log("Can't ignite while runnint or in end")
    }
  }

  return (
    <div className='flex flex-col'>
      <h1 className='text-white text-lg font-medium -translate-x-5'>Ignite Configuration</h1>
      <div className="w-max flex flex-row">
        <InputNumber id='ignite-quantity' title="Quantity" description="amount of tile that would be ignited" value={autoIgniteQuantity} reduxFunction={setAutoIgniteQuantity} unit='tiles' />
        <Button handleClick={handleIgniteTiles} style={{ margin: 'auto 0 0 20px' }}>
          <p>Ignite Tiles</p>
        </Button>
      </div>
    </div>
  )
}

export default IgniteConfig

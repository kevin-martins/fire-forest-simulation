import { FiChevronDown } from "react-icons/fi";
import { FaForwardStep } from "react-icons/fa6";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { simulationStateToText } from "../utils/utils";
import { setSimulationState } from "../features/terrainSlice";
import PlayModeState from "../models/playModeState";

const DropDown = () => {
  const [open, setOpen] = useState(false)
  const state = useSelector((state: RootState) => state.terrainConfig.playMode)

  return (
    <div>
      <label htmlFor="playmode-input" className="block text-md font-medium text-white">
        Simulation Mode:
        <p id="helper-text-explanation" className="font-normal mt-1 text-sm text-gray-400 block align-top">the playing mode of the simulation</p>
      </label>
      <motion.div animate={open ? "open" : "close"} className="relative">
        <button
          id='playmode-input'
          onClick={() => setOpen((pv) => !pv)}
          className="flex items-center gap-2 px-3 py-2 rounded-md text-slate-200 bg-slate-600 hover:bg-slate-500 transition-colors duration-300"
        >
          <span className="font-medium text-sm">{simulationStateToText(state)}</span>
          <motion.span variants={iconVariants}>
            <FiChevronDown />
          </motion.span>
        </button>

        <motion.ul
          initial={wrapperVariants.close}
          variants={wrapperVariants}
          style={{ originY: "top" }}
          className="flex flex-col gap-2 p-2 rounded-lg bg-slate-700 shadow-xl absolute top-[120%] w-48 overflow-hidden"
        >
          <Option setOpen={setOpen} newState={PlayModeState.Step} Icon={<FaForwardStep className="group-hover:animate-bounce" />} />
        </motion.ul>
      </motion.div>
    </div>
  )
}

type OptionProps = {
  newState: PlayModeState
  Icon: JSX.Element
  setOpen: Dispatch<SetStateAction<boolean>>
}

const Option = ({ newState, Icon, setOpen }: OptionProps) => {
  const dispatch = useDispatch()

  const handleClick = () => {
    setOpen(false)
    dispatch(setSimulationState(newState))
  }

  return (
    <motion.li
      variants={itemVariants}
      onClick={handleClick}
      className="group flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md text-slate-300 hover:text-white transition-colors cursor-pointer"
    >
      <motion.span variants={actionIconVariants}>
        {Icon} 
      </motion.span>
      <span>{simulationStateToText(newState)}</span>
    </motion.li>
  )
}

export default DropDown

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  },
  close: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1
    }
  }
}

const iconVariants = {
  open: { rotate: 180 },
  close: { rotate: 0 }
}

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren"
    }
  },
  close: {
    opacity: 0,
    y: -15,
    transition: {
      when: "afterChildren",
    }
  }
}

const actionIconVariants = {
  open: { scale: 1, y: 0 },
  close: { scale: 0, y: -7 }
}
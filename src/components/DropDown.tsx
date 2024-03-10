import { FiChevronDown } from "react-icons/fi";
import { FaForwardStep } from "react-icons/fa6";
import { MdAutorenew } from "react-icons/md";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";

const DropDown = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className="pl-5">
      <label htmlFor="quantity-input" className="block mb-2 text-md font-medium text-white">Simulation Mode:</label>
      <p id="helper-text-explanation" className="mt-2 text-sm text-gray-400 block align-top">the playing mode of the simulation</p>
      <motion.div animate={open ? "open" : "close"} className="relative">
        <button
          onClick={() => setOpen((pv) => !pv)}
          className="flex items-center gap-2 px-3 py-2 rounded-md text-indigo-50 bg-indigo-500 hover:bg-indigo-500 transition-colors"
        >
          <span className="font-medium text-sm">Simulation play mode</span>
          <motion.span variants={iconVariants}>
            <FiChevronDown />
          </motion.span>
        </button>

        <motion.ul
          initial={wrapperVariants.close}
          variants={wrapperVariants}
          style={{ originY: "top", translateX: "-50%" }}
          className="flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute top-[120%] left-[50%] w-48 overflow-hidden"
        >
          <Option setOpen={setOpen} Icon={<MdAutorenew className="group-hover:animate-spin" />} text="Auto" />
          <Option setOpen={setOpen} Icon={<FaForwardStep className="group-hover:animate-[wiggle_1s_ease-in-out_infinite]" />} text="Step by Step" />
        </motion.ul>
      </motion.div>
    </div>
  )
}

type OptionProps = {
  text: string
  Icon: JSX.Element
  setOpen: Dispatch<SetStateAction<boolean>>
}

const Option = ({ text, Icon, setOpen }: OptionProps) => {
  return (
    <motion.li
      variants={itemVariants}
      onClick={() => setOpen(false)}
      className="group flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors cursor-pointer"
    >
      <motion.span variants={actionIconVariants}>
        {Icon} 
      </motion.span>
      <span>{text}</span>
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
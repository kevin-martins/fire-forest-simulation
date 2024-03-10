import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { motion } from 'framer-motion';
import { setGameState } from '../features/terrainSlice';
import GameState from '../models/gameState';
import { getNextGameState } from '../utils/utils';
import explanationData from '../constants/explanationState';

const GameStateList = () => {
  const state: GameState = useSelector((state: RootState) => state.terrainConfig.gameState)
  const [onClick, setOnClick] = useState(false)
  const dispatch = useDispatch()

  const handleClick = () => {
    if (!onClick) {
      setOnClick(true)
      setTimeout(() => {
        dispatch(setGameState(getNextGameState(state)))
        setOnClick(false)
      }, 650)
    }
  }

  return (
    <div className='w-[450px] m-auto'>
      <div className=''>
        <motion.h1
          variants={titleVariants}
          initial='hidden'
          animate={onClick ? 'hidden' : 'show'}
          className='font-medium text-white'
        >
          {explanationData[state]?.title}
        </motion.h1>
        <motion.ul
          variants={listWrapperVariants}
          initial='hidden'
          animate={onClick ? 'hidden' : 'show'}
          className='text-slate-200 ml-6'
        >
          {explanationData[state]?.steps.map((step: any, i: number) => {
            return (
              <li key={i}>
                {step.split('').map((letter: string, j: number) => (
                  <motion.span
                    key={`${i}${j}`}
                    variants={letterVariants}
                    className='text-slate-400 ease-in-out transition-all duration-500'
                  >
                    {letter}
                  </motion.span>
                ))}
              </li>
            )
          })}
        </motion.ul>
        <motion.button
          variants={{ ...buttonVariants, show: { ...buttonVariants.show, transition: { delay: explanationData[state]?.delay } } }}
          initial='hidden'
          animate={onClick ? 'hidden' : 'show'}
          type='button'
          onClick={handleClick}
          className="ml-auto mt-3 w-max px-6 py-2 relative z-0 overflow-hidden flex whitespace-nowrap rounded-lg border-[1px] 
            border-neutral-500 font-medium
            text-slate-100 transition-all duration-300
            before:absolute before:inset-0
            before:-z-10 before:translate-y-[350%]
            before:scale-[1.5] before:scale-y-[5]
            before:rounded-[100%] before:bg-yellow-600
            before:transition-transform before:duration-1000
            before:content-[&quot;&quot;]
            hover:scale-105 hover:border-yellow-600 hover:text-slate-300
            hover:before:translate-y-[0%]
            active:scale-100"
        >
          next step
        </motion.button>
      </div>
    </div>
  )
}

export default GameStateList

const listWrapperVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { delayChildren: .7, staggerChildren: 0.01 }
  }
}

const letterVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 }
}

const titleVariants = {
  hidden: {
    x: -50,
    opacity: 0
  },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      delay: .2,
      duration: .4
    }
  }
}

const buttonVariants = {
  hidden: { scale: 0, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { delay: 1 } }
}

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { motion } from 'framer-motion';
import GameState from '../models/gameState';
import explanationData from '../constants/explanationState';

const GameStateList = () => {
  const state: GameState = useSelector((state: RootState) => state.terrainConfig.gameState)
  const [doAnimation, setDoAnimation] = useState(true)
  
  useEffect(() => {
    setDoAnimation(false)
    setTimeout(() => {
      setDoAnimation(true)
    }, 650)
  }, [state])

  return (
    <div className='mx-auto mb-12'>
      <div className=''>
        <motion.h1
          variants={titleVariants}
          initial='hidden'
          animate={doAnimation ? 'show' : 'hidden'}
          className='font-medium text-white'
        >
          {explanationData[state]?.title}
        </motion.h1>
        <motion.ul
          variants={listWrapperVariants}
          initial='hidden'
          animate={doAnimation ? 'show' : 'hidden'}
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

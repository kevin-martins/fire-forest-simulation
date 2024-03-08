import { PayloadAction } from '@reduxjs/toolkit'
import React from 'react'
import { useDispatch } from 'react-redux'

type Props = {
  title: string
  description: string
  value: number
  reduxFunction: (value: number) => PayloadAction<number>
  step?: number
}

const InputNumber = ({ title, description, value, reduxFunction, step = 1 }: Props) => {
  const dispatch = useDispatch()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(reduxFunction(Number(event.target.value)))
  }
  
  const handleDecrease = () => {
    dispatch(reduxFunction(value - step))
  }

  const handleIncrease = () => {
    dispatch(reduxFunction(value + step))
  }

  return (
    <div className="max-w-xs mx-auto">
      <label htmlFor="quantity-input" className="block mb-2 text-sm font-medium text-white text">{title}:</label>
      <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 dark:text-gray-400">{description}</p>
      <div className="relative flex items-center max-w-[8rem]">
        <button
          type="button"
          id="decrement-button"
          data-input-counter-decrement="quantity-input"
          className="bg-gray-700 hover:bg-gray-600 border-gray-600 border rounded-s-lg p-3 h-10  focus:ring-gray-800 group"
          onClick={handleDecrease}
        >
          <svg className="group-hover:scale-125 w-3 h-3 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
          </svg>
        </button>
        <input
          type="text"
          id="quantity-input"
          data-input-counter
          aria-describedby="helper-text-explanation"
          className="h-10 text-center text-lg block w-full py-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white outline-none"
          placeholder="999"
          value={value}
          onChange={handleChange}
          required
        />
        <button
          type="button"
          id="increment-button"
          data-input-counter-increment="quantity-input"
          className="group bg-gray-700 hover:bg-gray-600 border-gray-600 border rounded-e-lg p-3 h-10 focus:ring-gray-700"
          onClick={handleIncrease}
        >
          <svg className="group-hover:scale-125 w-3 h-3 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
          </svg>
        </button>
      </div>
      {/* <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 dark:text-gray-400">Please select a 5 digit number from 0 to 9.</p> */}
    </div>
  )
}

export default InputNumber

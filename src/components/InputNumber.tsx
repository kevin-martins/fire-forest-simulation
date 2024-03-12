import { PayloadAction } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

type Props = {
  id: string
  title: string
  description: string
  value: number
  range: {
    min: number
    max: number
  }
  reduxFunction: (value: number) => PayloadAction<number>
  unit?: string
  step?: number
  error?: boolean
}

const InputNumber = ({ id, title, description, value, range, reduxFunction, unit = '', error = false }: Props) => {
  const dispatch = useDispatch()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = Number(event.target.value)
    if (inputValue > range.max) {
      dispatch(reduxFunction(range.max))
    } else if (inputValue < range.min) {
      dispatch(reduxFunction(range.min))
    } else {
      dispatch(reduxFunction(inputValue))
    }
  }

  return (
    <div>
      <label htmlFor={`${id}-input`} className="block mb-px text-md font-medium text-white">
        {title}:
        <p id="helper-text-explanation" className="font-normal mt-1 text-sm text-gray-400 block align-top">{description} from {range.min} to {range.max}{unit}</p>
      </label>
      <div className="relative flex items-center max-w-[8rem]">
        <input
          type="number"
          id={`${id}-input`}
          data-input-counter
          className="relative h-10 text-center text-lg block w-full py-2.5 bg-gray-700 border-gray-600 rounded text-white outline-none"
          value={value}
          onChange={handleChange}
          required
        />
        <span className='absolute z-10 text-slate-100 left-1/2 px-2'>{unit}</span>
      </div>
      {error && <p id="helper-text-explanation" className="mt-px text-sm text-red-700">{title} useless for now, wait for the next release !</p>}
    </div>
  )
}

export default InputNumber

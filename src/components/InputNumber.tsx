import { PayloadAction } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

type Props = {
  id: string
  title: string
  description: string
  value: number
  reduxFunction: (value: number) => PayloadAction<number>
  unit?: string
  step?: number
}

const InputNumber = ({ id, title, description, value, reduxFunction, unit = '', step = 1 }: Props) => {
  const [error, setError] = useState<boolean>(false)
  const dispatch = useDispatch()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(reduxFunction(Number(event.target.value)))
  }

  return (
    <div>
      <label htmlFor={`${id}-input`} className="block mb-px text-md font-medium text-white">
        {title}:
        <p id="helper-text-explanation" className="font-normal mt-1 text-sm text-gray-400 block align-top">{description}</p>
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
      {error && <p id="helper-text-explanation" className="mt-2 text-sm text-red-400">the value is out of bounds</p>}
    </div>
  )
}

export default InputNumber

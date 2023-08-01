import React, { SyntheticEvent } from 'react'

const InputNumber = () => {
  const decrement = (e: SyntheticEvent) => {
    const btn = (e.target as HTMLElement).parentNode!.parentElement!.querySelector('button[data-action="decrement"]') as HTMLElement
    const target = btn.nextElementSibling as HTMLInputElement
    let value = Number(target.value)
    value--
    target.value = value.toString()
  }

  const increment = (e: SyntheticEvent) => {
    const btn = (e.target as HTMLElement).parentNode!.parentElement!.querySelector('button[data-action="decrement"]') as HTMLElement
    const target = btn.nextElementSibling as HTMLInputElement
    let value = Number(target.value)
    value++
    target.value = value.toString()
  }

  return (
    <div className="custom-number-input h-10 w-32">
      <label htmlFor="custom-input-number" className="w-full text-gray-700 text-sm font-semibold">
        Counter Input
      </label>
      <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
        <button
          onClick={decrement}
          data-action="decrement"
          className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
        >
          <span className="m-auto text-2xl font-thin">−</span>
        </button>
        <input
          type="number"
          className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black md:text-base cursor-default flex items-center text-gray-700 outline-none"
          name="custom-input-number"
          defaultValue="0"
        />
        <button
          onClick={increment}
          data-action="increment"
          className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
        >
          <span className="m-auto text-2xl font-thin">+</span>
        </button>
      </div>
    </div>
  )
}

export default InputNumber

import { Select, Option, SelectProps } from '@material-tailwind/react'
import React from 'react'

export interface InputTextProps extends Omit<SelectProps, 'children'> {
  options: Array<string>
}

const Dropdown: React.FC<InputTextProps> = ({ options, label, disabled, value }) => {
  return (
    <div className="mb-4 [&>div>ul>li]:!text-black [&>div>button]:!border-black">
      <Select
        label={label}
        className="w-96 border rounded [&+label]:-mt-3.5 [&>span]:px-2 [&>span]:!pt-0 border !border-blue-gray-200 [&+label]:!text-black"
        color="gray"
        disabled={disabled}
        variant="static"
        value={value}
      >
        {options.map((item) => (
          <Option key={item}>{item}</Option>
        ))}
      </Select>
    </div>
  )
}

export default Dropdown

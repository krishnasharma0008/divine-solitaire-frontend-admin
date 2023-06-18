import { Input, InputProps } from '@material-tailwind/react'
import React from 'react'

export interface InputTextProps extends InputProps {
  className?: string
  containerClass?: string
  id?: string
  label: string
  name: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  type: 'file' | 'number' | 'date' | 'text' | 'password'
  value: string
}

const InputText: React.FC<InputTextProps> = ({ className, containerClass, id, label, onChange, type, value, disabled }) => {
  return (
    <div className={`mb-4 ${containerClass} [&>div>label]:peer-focus:text-black font-[Montserrat]`}>
      <Input
        variant="static"
        className={`border rounded !border-black [&+label]:-mt-3.5 px-2 !pt-2 [&+label]:!text-black [&+label]:focus:!text-black ${className}`}
        color="gray"
        label={label}
        onChange={onChange}
        id={id}
        type={type}
        value={value}
        disabled={disabled}
      />
    </div>
  )
}

export default InputText

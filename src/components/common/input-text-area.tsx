import { Textarea, TextareaProps } from '@material-tailwind/react'
import React from 'react'

export interface TextAreaProps extends TextareaProps {
  className?: string
  containerClass?: string
  id?: string
  label: string
  name: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  value: string
  disabled?: boolean
  row?: number
}

const TextArea: React.FC<TextAreaProps> = ({ className, containerClass, id, label, name, onChange, value, placeholder, disabled, row }) => {
  return (
    <div className={`mb-4 ${containerClass}`}>
      <label htmlFor={id} className="block text-gray-700 text-sm mb-2">
        {label}
      </label>
      <Textarea
        id={id}
        name={name}
        className={`border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        disabled={disabled}
        rows={row}
      />
    </div>
  )
}

export default TextArea

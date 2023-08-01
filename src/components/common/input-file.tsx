import React, { ChangeEvent, useEffect, useState } from 'react'
import { FileUploader } from 'react-drag-drop-files'

import { CloudIcon } from '../icons'

export interface InputTextProps {
  htmlFor?: string
  label: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  value: string
}

const InputFile: React.FC<InputTextProps> = ({ htmlFor, label, onChange, placeholder }) => {
  const [file, setFile] = useState<File | null>(null)
  const handleChange = (file: File) => {
    setFile(file)
  }

  // const stableOnChange = useCallback(onChange, [])

  // useEffect(() => {
  //   if (file) {
  //     stableOnChange({
  //       target: { files: [file] as unknown as FileList },
  //     } as ChangeEvent<HTMLInputElement>)
  //   }
  // }, [file, stableOnChange])

  useEffect(() => {
    if (file)
      onChange({
        target: { files: [file] as unknown as FileList },
      } as ChangeEvent<HTMLInputElement>)
  }, [file, onChange])

  return (
    <div className="mb-4">
      <label className="block mb-1" htmlFor={htmlFor}>
        {label}
      </label>
      <FileUploader handleChange={handleChange} types={['pdf', 'jpg', 'jpeg', 'png']}>
        <div>
          <label className="flex justify-center w-full h-32 px-4 transition border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none bg-[#f8f8f8]">
            <span className="flex items-center space-x-2 flex-col justify-evenly	">
              <CloudIcon className="w-7" />
              <span className="font-medium text-gray-600">
                {placeholder}
                <span className="text-blue-600 underline ml-1">Browse here</span>
              </span>
            </span>
            <input type="file" name="file_upload" className="hidden" onChange={onChange} />
          </label>
        </div>
      </FileUploader>
    </div>
  )
}

export default InputFile

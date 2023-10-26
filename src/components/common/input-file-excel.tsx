import React, { ChangeEvent, useState } from 'react'
import { FileUploader } from 'react-drag-drop-files'

import { CloudIcon } from '../icons'

export interface InputTextProps {
  htmlFor?: string
  label: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  value: string
  disabled?: boolean
}

const InputFileExcel: React.FC<InputTextProps> = ({ htmlFor, label, onChange, placeholder, disabled }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleChange = (file: File) => {
    setSelectedFile(file) // Store the selected file in state
    onChange({
      target: { files: [file] as unknown as FileList },
    } as ChangeEvent<HTMLInputElement>)
  }

  return (
    <div className="mb-4">
      <label className="block mb-1" htmlFor={htmlFor}>
        {label}
      </label>
      {!disabled ? ( // Check if the component is not disabled
        <FileUploader handleChange={handleChange} types={['xlsx', 'xls']}>
          <div>
            <label className="flex justify-center w-full h-32 px-4 transition border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none bg-[#f8f8f8]">
              <span className="flex items-center space-x-2 flex-col justify-evenly ">
                <CloudIcon className="w-7" />
                <span className="font-medium text-gray-600">
                  {/* selected file name display start */}
                  {selectedFile && (
                    <span>
                      Selected file: <strong>{selectedFile.name}</strong>
                      <br />
                    </span>
                  )}
                  {/* selected file name display end */}
                  {placeholder}
                  <span className="text-blue-600 underline ml-1">Browse here</span>
                </span>
              </span>
              <input type="file" name="file_upload" className="hidden" onChange={onChange} />
            </label>
          </div>
        </FileUploader>
      ) : (
        // Render a disabled state when the component is disabled
        <div className="flex justify-center w-full h-32 px-4 transition border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-not-allowed bg-[#f8f8f8]">
          <span className="flex items-center space-x-2 flex-col justify-evenly ">
            <CloudIcon className="w-7 text-gray-400" />
            <span className="font-medium text-gray-400">
              {placeholder}
              <span className="text-blue-600 underline ml-1 cursor-not-allowed">Browse here</span>
            </span>
          </span>
        </div>
      )}
    </div>
  )
}

export default InputFileExcel

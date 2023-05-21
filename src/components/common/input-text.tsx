import React, { ChangeEvent } from "react";

export interface InputTextProps {
  className?: string;
  htmlFor?: string;
  id?: string;
  label: string;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type: "file" | "number" | "date" | "text" | "password";
  value: string;
}

const InputText: React.FC<InputTextProps> = ({
  className,
  htmlFor,
  id,
  label,
  name,
  onChange,
  placeholder,
  type,
  value,
}) => {
  return (
    <div className="mb-4">
      <label className="block mb-1" htmlFor={htmlFor}>
        {label}
      </label>
      <input
        className={`py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block ${className}`}
        id={id}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        value={value}
      />
    </div>
  );
};

export default InputText;

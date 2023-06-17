import React from 'react'

interface Field {
  name: string
  value: string | React.ReactNode
}

export interface MetaDetailsCardProps {
  label: string
  fields: Array<Field>
  containerClass?: string
  className?: string
}

const MetaDetailsCard: React.FC<MetaDetailsCardProps> = ({ label, containerClass, className, fields }) => (
  // <div className="bg-white rounded-lg">
  <>
    <div className={`${containerClass}`}>
      <h1 className={`py-2 font-medium text-base ${className}`}>{label}</h1>
    </div>
    <div className="flex justify-between mx-4 mt-6">
      {fields.map(({ name, value }) => (
        <div className="flex flex-col items-center " key={name}>
          <div className="mb-4">{name}</div>
          <div className="text-center">{value}</div>
        </div>
      ))}
    </div>
  </>
  // </div>
)

export default MetaDetailsCard

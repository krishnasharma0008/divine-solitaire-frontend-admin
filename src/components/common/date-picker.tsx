import { useState } from 'react'
import DatePickerTw from 'react-datepicker'

import { SvgIconProps } from '../icons'

interface DatePickerProps {
  className?: string
  label: string
  value?: Date | null
  showIcon?: boolean
  icon: React.ComponentType<SvgIconProps & { onClick: () => void }>
  onChange: (date: Date) => void
}

const DatePicker: React.FC<DatePickerProps> = ({ showIcon, onChange, className, label, value, icon: Icon }) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  const handleIconClick = () => {
    setIsDatePickerOpen(true)
  }

  const handleDateChange = (date: Date) => {
    onChange(date)
    setIsDatePickerOpen(false)
  }

  return (
    <div className={`flex flex-col ${className}`}>
      <label className="absolute -mt-6">{label}</label>
      <div className="flex border border-black p-2.5 rounded justify-between items-center">
        <DatePickerTw
          //showIcon={showIcon}
          selected={value}
          onChange={handleDateChange}
          dateFormat="dd MMMM yyyy"
          className="focus:outline-none focus:border-none"
          readOnly={true} // Make the DatePicker read-only
          open={isDatePickerOpen} // Control visibility of the DatePicker based on state
          onClickOutside={() => setIsDatePickerOpen(false)} // Close the DatePicker when clicking outside
        />
        {showIcon && <Icon className="cursor-pointer" onClick={handleIconClick} />}
      </div>
    </div>
  )
}

export default DatePicker
export { type DatePickerProps }

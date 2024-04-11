import { IconButton } from '@material-tailwind/react'
import React from 'react'

import DatePicker from '@/components/common/date-picker'

import { CalendarIcon } from '../icons'
import SearchIcon from '../icons/search-icon'

interface SearchBoxDateProps {
  // value?: string
  // onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  value?: Date // Change value type to Date
  onChange?: (date: Date | null) => void // Adjust onChange type
  onSearchClick?: () => void
}

const SearchBoxDate: React.FC<SearchBoxDateProps> = ({ value, onChange, onSearchClick }) => {
  const handleDateChange = (date: Date | null) => {
    if (onChange) {
      onChange(date || null) // Pass null if no date is selected
    }
  }
  return (
    <div className="w-full flex justify-end !h-[44px] shadow-md rounded">
      <div className="w-full border border-r-0 border-slate-200">
        {/* <InputText placeholder="Search......" type="text" value={value || ''} onChange={onChange} className="w-full border-none" containerClass="w-full" /> */}
        <DatePicker showIcon={true} onChange={handleDateChange} label="" value={value || null} icon={CalendarIcon} className="[&>div]:border-none" />
      </div>
      <div className="!h-[45px] bg-[#00A0B6] border border-r-0 border-slate-200">
        <IconButton
          className=" bg-[#00A0B6] hover:shadow-[#00A0B6]/20 focus:shadow-[#00A0B6]/20 active:shadow-[#00A0B6]/10 border-none"
          onClick={onSearchClick}
        >
          <SearchIcon className="fab fa-github text-lg" />
        </IconButton>
      </div>
    </div>
  )
}

export default SearchBoxDate

import { IconButton } from '@material-tailwind/react'
import React, { ChangeEvent } from 'react'

import Dropdown from './dropdown'
import InputText from './input-text'
import SearchIcon from '../icons/search-icon'

interface SearchBoxProps {
  options: Array<string>
  selected?: (elem?: React.ReactNode, idx?: number) => React.ReactNode
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSearchClick?: () => void
}

const SearchBox: React.FC<SearchBoxProps> = ({ options, selected, value, onChange, onSearchClick }) => {
  return (
    <div className="w-full flex justify-end !h-[44px] shadow-md rounded">
      <div className="border border-r-0 border-slate-200 bg-slate-100">
        <Dropdown options={options} selected={selected} disabled={false} className="border-none" />
      </div>
      <div className="w-full border border-r-0 border-slate-200">
        <InputText placeholder="Search......" type="text" value={value || ''} onChange={onChange} className="w-full border-none" containerClass="w-full" />
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

export default SearchBox

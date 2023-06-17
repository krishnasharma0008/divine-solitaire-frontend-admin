import Image from 'next/image'
import Link from 'next/link'

import { URLs } from '@/constants'

import { SvgIconProps } from '../icons/'
interface SidebarItem {
  title: string
  url?: string
  icon: string | React.FC<SvgIconProps>
  onClick?: () => void
  name: URLs
}

export interface SidebarProps {
  items: Array<SidebarItem>
  pageName: URLs
}

const Sidebar: React.FC<SidebarProps> = ({ items, pageName }) => {
  return (
    <div className="w-1/6 fixed sidebar bg-black min-h-screen	font-body">
      <div className="flex h-32 items-center justify-center">
        <span className="font-bold text-sm">
          <Link href="/">
            <Image src="/Logowhite 1.svg" alt="Divine Logo" height={'36'} width={'102'} className="hover:cursor-pointer" />
          </Link>
        </span>
      </div>
      <hr />
      <div className="center font-normal max-h-[calc(100vh_-_64px)] overflow-y-auto scrolling">
        <ul className="">
          {items.map(({ title, icon: Icon, url, onClick: onclick, name }) => {
            return (
              <Link href={url || '#'} key={url} onClick={onclick}>
                <li
                  className={`flex p-4 cursor-pointer h-16 text-left align-middle hover:text-black hover:bg-white hover:align-middle items-center [&>svg]:hover:stroke-black ${
                    pageName === name ? 'bg-white [&>svg]:stroke-black' : 'text-white'
                  }`}
                >
                  {Icon && <Icon />}
                  <span className="ml-6 text-base leading-5">{title}</span>
                </li>
              </Link>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar

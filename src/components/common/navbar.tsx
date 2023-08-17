import React from 'next'
//import Image from 'next/image'
// import { useRouter } from 'next/router'
// import { useState } from 'react'

import { Breadcrumbs } from '@/interface/breadcrumbs'
import { getUserName } from '@/local-storage'
// import { deleteToken } from '@/local-storage'

// import { TriangleDownIcon } from '../icons'

type NavbarProps = Omit<Breadcrumbs, 'pageName'>

const Navbar: React.FC<NavbarProps> = ({ breadcrumbs }) => {
  //const [open, setOpen] = useState<boolean>(false)
  //const { push } = useRouter()
  //const openUserDropdown = () => setOpen((oldVal) => !oldVal)

  // const logout = () => {
  //   deleteToken()
  //   push('/login')
  // }

  return (
    <div className="flex items-center text-sm text-neutral-600 bg-white mb-10 rounded py-3.5">
      <div className="w-full flex items-center px-4">
        <div className="inline-block w-5/6">
          {breadcrumbs.map((item, idx) => (
            <a className="font-normal leading-4" href={item.url} key={item.url}>
              {item.text}
              {idx < breadcrumbs.length - 1 && <span className="pl-2.5 mr-2.5">{'>'}</span>}
            </a>
          ))}
        </div>
        <div className="flex items-center w-1/6 justify-end">
          <div className="mr-5 relative">{getUserName()}</div>
          {/*<div className="mr-5 relative">
            <Image
              src="https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2250&q=80"
              alt=""
              className="w-8 h-8 rounded-full"
              width={36}
              height={36}
            />
          </div> */}
          {/* <span onClick={openUserDropdown}>
            <TriangleDownIcon className="w-4" />
          </span>
          {open && (
            <div className="fixed w-24 h-12 bg-white p-1.5 float-right top-12 right-0 border-2">
              <button className=" hover:bg-white-700 font-bold py-2 px-4 rounded shadow" onClick={logout}>
                Logout
              </button>
            </div>
          )} */}
        </div>
      </div>
    </div>
  )
}

export default Navbar

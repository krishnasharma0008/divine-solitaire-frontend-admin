import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import Navbar from '@/components/common/navbar'
import Sidebar, { SidebarProps } from '@/components/common/sidebar'
import {
  ActiveNotificationsIcon,
  EcomOrdersIcon,
  InsuranceIcon,
  PYDSIcon,
  QuestionIcon,
  ResaleIcon,
  SecondarySaleIcon,
  SignOutIcon,
  SpecialProductsIcon,
  StoreLocatorIcon,
  UserIcon,
} from '@/components/icons'
import PriceRequestIcon from '@/components/icons/price-request-icon'
import { URLs } from '@/constants'
import { Breadcrumbs } from '@/interface/breadcrumbs'
import { getToken, deleteToken } from '@/local-storage'

const sidebarProps: Omit<SidebarProps, 'pageName'> = {
  items: [
    { title: 'Users', url: '/admin/user', icon: UserIcon, name: URLs.USER },
    { title: 'Secondary Sale', icon: SecondarySaleIcon, name: URLs.DASHBOARD },
    {
      title: 'Insurance',
      url: '/admin/insurance',
      icon: InsuranceIcon,
      name: URLs.INSURANCE,
    },
    { title: 'Price Request', icon: PriceRequestIcon, name: URLs.USER_DETAIL },
    {
      title: 'Resale',
      url: '/admin/resale',
      icon: ResaleIcon,
      name: URLs.RESALE,
    },
    { title: 'Ecom Orders', icon: EcomOrdersIcon, name: URLs.USER_DETAIL },
    { title: 'Store Locator', icon: StoreLocatorIcon, name: URLs.USER_DETAIL },
    {
      title: 'Special Products',
      url: '/admin/special-products',
      icon: SpecialProductsIcon,
      name: URLs.SPECIAL_PRODUCTS,
    },
    {
      title: 'Active Notifications',
      icon: ActiveNotificationsIcon,
      name: URLs.USER_DETAIL,
    },
    { title: 'PYDS', icon: PYDSIcon, name: URLs.USER_DETAIL },
    {
      title: 'Log Out',
      url: '/login',
      icon: SignOutIcon,
      onClick: () => deleteToken(),
      name: URLs.USER_DETAIL,
    },
    { title: 'Help', icon: QuestionIcon, name: URLs.USER_DETAIL },
  ],
}

export interface LayoutWrapperProps extends Breadcrumbs {
  children: React.ReactNode
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ breadcrumbs, children, pageName }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const { asPath } = useRouter()

  useEffect(() => {
    if (getToken()) {
      setIsLoggedIn(true)
    }
  }, [asPath])

  if (!isLoggedIn || asPath === '/login') {
    return <>{children}</>
  }
  return (
    <>
      <div className="flex">
        <Sidebar {...sidebarProps} pageName={pageName} />
        <div className="w-5/6 fixed right-0 flex-initial p-5 bg-gray-100 overflow-y-auto	h-full">
          <Navbar breadcrumbs={breadcrumbs} />
          {children}
        </div>
      </div>
    </>
  )
}

export default LayoutWrapper

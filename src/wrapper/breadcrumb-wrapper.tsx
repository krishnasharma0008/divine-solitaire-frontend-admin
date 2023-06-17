import { useEffect } from 'react'

import { AppCommon, Breadcrumbs } from '@/interface'

type BreadcrumbsMod = Omit<Breadcrumbs, 'breadcrumbs'>
interface BreadcrumbWrapperProps extends AppCommon, BreadcrumbsMod {
  children: React.ReactNode
}

const BreadcrumbWrapper: React.FC<BreadcrumbWrapperProps> = ({ children, pageName, setPageName }) => {
  useEffect(() => {
    setPageName(pageName)
  }, [pageName, setPageName])

  return <>{children}</>
}

export default BreadcrumbWrapper
export { type BreadcrumbWrapperProps }

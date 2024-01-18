import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { URLs } from '@/constants'
import { AppCommon } from '@/interface'
import { getToken } from '@/local-storage'
import { DashboardScreen } from '@/screens'
import BreadcrumbWrapper from '@/wrapper/breadcrumb-wrapper'

type HomepageProps = AppCommon

const Homepage: React.FC<HomepageProps> = ({ setPageName }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<undefined | boolean>(undefined)

  const { asPath } = useRouter()

  useEffect(() => {
    setIsLoggedIn(!!getToken())
  }, [asPath])

  if (isLoggedIn === undefined) {
    return <></>
  } else {
    return (
      <BreadcrumbWrapper pageName={URLs.DASHBOARD} setPageName={setPageName}>
        <div className="flex">
          <DashboardScreen />
        </div>
      </BreadcrumbWrapper>
    )
  }
}

export default Homepage

import '../globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { URLs, breadcrumbList } from '@/constants'
import { getToken } from '@/local-storage'
import { LayoutWrapper } from '@/wrapper'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const { push, asPath } = useRouter()
  const [pageName, setPageName] = useState<URLs>(URLs.DASHBOARD)

  useEffect(() => {
    if (!getToken() && asPath !== '/login') {
      push('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asPath])

  return (
    <>
      <div className="text-sm">
        <LayoutWrapper breadcrumbs={breadcrumbList[pageName]} pageName={pageName}>
          <Component {...pageProps} setPageName={setPageName} />
        </LayoutWrapper>
      </div>
    </>
  )
}

export default App

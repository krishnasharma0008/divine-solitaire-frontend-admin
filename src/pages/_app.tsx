import '../globals.css'
import { ThemeProvider } from '@material-tailwind/react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { URLs, breadcrumbList } from '@/constants'
import { getToken } from '@/local-storage'
import { LayoutWrapper, NotificationWrapper } from '@/wrapper'
import LoaderWrapper from '@/wrapper/loader-wrapper'
import 'react-toastify/dist/ReactToastify.css'
import 'react-datepicker/dist/react-datepicker.css'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const { push, asPath } = useRouter()
  const [pageName, setPageName] = useState<URLs>(URLs.DASHBOARD)

  const [token, setToken] = useState<string | null | undefined>(undefined)

  useEffect(() => {
    if (!getToken() && asPath !== '/login') {
      push('/login')
    } else {
      setToken(getToken())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asPath])

  if (token !== undefined || asPath === '/login') {
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

  return <></>
}

const WrappedApp: React.FC<AppProps> = (props) => (
  <ThemeProvider>
    <LoaderWrapper>
      <NotificationWrapper>
        <App {...props} />
      </NotificationWrapper>
    </LoaderWrapper>
  </ThemeProvider>
)

export default WrappedApp

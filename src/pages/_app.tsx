import '../globals.css'
import { ThemeProvider } from '@material-tailwind/react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'

import { URLs, breadcrumbList } from '@/constants'
import LoaderContext from '@/context/loader-context'
import { deleteToken, getToken, deleteUserName } from '@/local-storage'
import { LayoutWrapper, NotificationWrapper } from '@/wrapper'
import LoaderWrapper from '@/wrapper/loader-wrapper'
import 'react-toastify/dist/ReactToastify.css'
import 'react-datepicker/dist/react-datepicker.css'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const { push, asPath } = useRouter()
  const [pageName, setPageName] = useState<URLs>(URLs.DASHBOARD)

  const [token, setToken] = useState<string | null | undefined>(undefined)

  const { showLoader, hideLoader } = useContext(LoaderContext)

  const Router = useRouter()

  useEffect(() => {
    const handleRouteChangeStart = () => {
      showLoader() // Show loader when the route change starts
    }

    const handleRouteChangeComplete = () => {
      hideLoader() // Hide loader when the route change completes
    }

    // Listen for route change events
    Router.events.on('routeChangeStart', handleRouteChangeStart)
    Router.events.on('routeChangeComplete', handleRouteChangeComplete)

    // Cleanup event listeners when the component unmounts
    return () => {
      Router.events.off('routeChangeStart', handleRouteChangeStart)
      Router.events.off('routeChangeComplete', handleRouteChangeComplete)
    }
  }, [showLoader, hideLoader])

  useEffect(() => {
    // Retrieve the token from local storage
    const storedToken = getToken()

    if (storedToken) {
      // Split the token into its three parts: header, payload, and signature
      const [, /* header */ payload /* signature */] = storedToken.split('.')

      // Decode the base64-encoded payload
      const decodedPayload = JSON.parse(atob(payload))

      // Access decoded payload information
      //console.log('Decoded Token : ', decodedPayload)

      // Check if the token has an expiration time ('exp')
      if (decodedPayload.exp) {
        const currentTimestamp = Math.floor(Date.now() / 1000)

        if (decodedPayload.exp < currentTimestamp) {
          deleteToken()
          deleteUserName()
          // Token has expired
          console.log('Token has expired')
        } else {
          setToken(getToken())
          // Token is still valid
          console.log('Token is still valid')
        }
      } else {
        // Invalid or missing expiration time in the payload
        console.error('Invalid or missing expiration time in the token payload')
      }
    } else {
      // Token is not present in local storage
      console.error('Token is not present in local storage')
    }

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

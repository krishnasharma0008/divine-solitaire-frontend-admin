import { Dialog, DialogBody } from '@material-tailwind/react'
import { useCallback, useEffect, useState } from 'react'

import Loader from '@/components/common/loader'
import LoaderContext from '@/context/loader-context'

interface LoaderWrapperProps {
  children: React.ReactNode
}

const LoaderWrapper: React.FC<LoaderWrapperProps> = ({ children }) => {
  const [loader, setLoader] = useState<number>(0)

  const showLoader = useCallback(() => {
    setLoader((loaderVal) => loaderVal + 1)
  }, [])
  const hideLoader = useCallback(() => {
    setLoader((loaderVal) => (loaderVal >= 0 ? 0 : loaderVal - 1))
  }, [])

  useEffect(() => {
    const container: HTMLDivElement | null = document.querySelector('div[data-floating-ui-portal]')
    const innerContainer: HTMLDivElement = document.querySelector('div[data-floating-ui-portal] > div') || ({} as HTMLDivElement)
    if (loader > 0 && container) {
      container.style.display = 'block'
      innerContainer.style.display = 'block'
      // container.style.display = 'block'
    }
  }, [loader])

  return (
    <LoaderContext.Provider
      value={{
        showLoader,
        hideLoader,
      }}
    >
      <Dialog
        open={loader > 0}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        handler={() => {}}
        className="bg-transparent shadow-none"
      >
        <DialogBody className="p-8 font-body text-black text-center">
          <Loader />
        </DialogBody>
      </Dialog>
      {children}
    </LoaderContext.Provider>
  )
}

export default LoaderWrapper

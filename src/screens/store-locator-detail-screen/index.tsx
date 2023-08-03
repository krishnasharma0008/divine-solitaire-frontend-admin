import dayjs from 'dayjs'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect, useReducer, useState } from 'react'

import { getStoreLocatorDetail } from '@/api'
import InputText from '@/components/common/input-text'
import TextArea from '@/components/common/input-text-area'
import LoaderContext from '@/context/loader-context'
import { StoreLocator } from '@/interface'

import SectionContainer from './sub-components/section-container'

interface StoreLocatorDetailAction {
  type: string
  payload: StoreLocator | string
}

const initialState: StoreLocator = {
  id: 0,
  name: '',
  address: '',
  contact_no: '',
  email: '',
  country: '',
  state: '',
  city: '',
  created_at: '',
}

const StoreLocatorDetailReducer = (state: StoreLocator, action: StoreLocatorDetailAction) => {
  if (action.type === 'ALL') {
    return { ...state, ...(action.payload as unknown as StoreLocator) }
  }
  return { ...state, [action.type]: action.payload }
}

const StoreLocatorDetailScreen: React.FC = () => {
  const [state, dispatch] = useReducer(StoreLocatorDetailReducer, initialState)
  const { showLoader, hideLoader } = useContext(LoaderContext)

  const [editMode] = useState<boolean>(false) //setEditMode

  const { query } = useRouter()

  useEffect(() => {
    if (!query.id) {
      return
    }

    showLoader()
    getStoreLocatorDetail(query?.id as unknown as number)
      .then((res) => {
        dispatch({
          type: 'ALL',
          payload: { ...(res.data.data as unknown as StoreLocator) },
        })
        hideLoader()
      })
      .catch((err) => {
        hideLoader()
        console.log('errr', err)
      })
  }, [hideLoader, query.id, showLoader])

  //const onEditClickHandler = () => setEditMode(true)

  return (
    <div className="flex-1 w-full mt-1 bg-gray-50 pt-10 px-4 rounded-lg">
      <SectionContainer className="mt-6">
        <div>
          <h1 className="py-2 font-medium text-base">Store Details :</h1>
        </div>
        <div className="flex-row pt-5">
          <InputText className="w-full" label="Name" name="name" placeholder="Name" type="text" value={state?.name || ''} disabled={!editMode} />
          <div className="flex justify-between pt-5 pb-5">
            <InputText
              className="w-full"
              containerClass="w-1/3"
              label="Mobile No."
              name="mno"
              type="text"
              value={state?.contact_no || ''}
              disabled={!editMode}
            />
          </div>
          <InputText className="w-full" label="Email" name="email" placeholder="Email" type="text" value={state?.email || ''} disabled={!editMode} />
        </div>

        <div className="flex-row pt-5">
          <TextArea className="w-full" label="Address" name="address" placeholder="Address" rows={3} value={state?.address || ''} disabled={!editMode} />
          <div className="flex justify-between pt-5 ">
            <InputText label="State" name="state" placeholder="State" type="text" value={state?.state || ''} containerClass="w-1/3" disabled={!editMode} />
            <InputText label="City" name="city" placeholder="City" type="text" value={state?.city || ''} containerClass="w-1/3" disabled={!editMode} />
          </div>
          <div className="flex justify-between pt-5 ">
            <InputText label="Country" name="country" type="text" value={state?.country || ''} containerClass="w-1/3" disabled={!editMode} />
            <InputText
              label="Created Date "
              name="created_at"
              type="text"
              value={dayjs(state?.created_at).format('DD MMMM YYYY')}
              containerClass="w-1/3"
              disabled={!editMode}
            />
          </div>
        </div>
      </SectionContainer>

      <SectionContainer className="mt-6">
        <div className="mt-6 flex items-center justify-center gap-x-6 my-5 py-5">
          <Link href="/admin/storelocator">
            <button
              type="submit"
              className="inline-flex items-center justify-center px-4 py-2 bg-Chinese-Black-sidebar border border-transparent rounded-md font-semibold capitalize text-white hover:bg-Chinese-Black-sidebar active:bg-Chinese-Black-sidebar focus:outline-none focus:bg-Chinese-Black-sidebar focus:ring focus:ring-red-200 disabled:opacity-25 transition"
            >
              Close
            </button>
          </Link>
        </div>
      </SectionContainer>
    </div>
  )
}

export default StoreLocatorDetailScreen

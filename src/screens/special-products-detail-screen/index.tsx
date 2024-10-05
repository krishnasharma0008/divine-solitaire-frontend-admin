import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect, useReducer, useState } from 'react'

import { createSpecialProducts, getSpecialProductsDetail } from '@/api'
import { Dropdown } from '@/components/common'
import InputText from '@/components/common/input-text'
import { NOTIFICATION_MESSAGES } from '@/config'
import LoaderContext from '@/context/loader-context'
import NotificationContext from '@/context/notification-context'
import { SPECIAL_PRODUCTS_STATUS } from '@/enums'
import { SpecialProductsDetail } from '@/interface'

import SectionContainer from './sub-components/section-container'

interface SpecialProductsDetailAction {
  type: string
  payload?: string | boolean | SpecialProductsDetail
}

const initialState: SpecialProductsDetail = {
  isactive: true,
  design_type: '',
  design_no: '',
  price: '',
  solitaire_details: '',
  mount_details: '',
  gross_weight: '',
  net_weight: '',
  usd_price: '',
  usd_uae_price: '',
}

const SpecialProductsDetailReducer = (state: SpecialProductsDetail, action: SpecialProductsDetailAction) => {
  if (action.type === 'ALL') {
    return {
      ...state,
      ...(action.payload as unknown as SpecialProductsDetail),
    }
  }
  return { ...state, [action.type]: action.payload }
}

const SpecialProductDetailScreen: React.FC = () => {
  const { query, push } = useRouter()
  const [state, dispatch] = useReducer(SpecialProductsDetailReducer, initialState)
  const [editMode, setEditMode] = useState<boolean>(query?.id === 'new')
  const { notify, notifyErr } = useContext(NotificationContext)
  const { showLoader, hideLoader } = useContext(LoaderContext)

  useEffect(() => {
    if (!query.id || query.id === 'new') {
      setEditMode(true)
      return
    }
    /**/
    showLoader()
    getSpecialProductsDetail(query?.id as unknown as number)
      .then((res) => {
        dispatch({
          type: 'ALL',
          payload: { ...(res.data.data as unknown as SpecialProductsDetail) },
        })
        hideLoader()
      })
      .catch((err) => {
        hideLoader()
        console.log('errr', err)
      })
  }, [hideLoader, query.id, showLoader])

  const onChangeHandlerCreator = (fieldname: string) => {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      dispatch({
        type: fieldname,
        payload: (e.target as HTMLInputElement).value,
      })
  }

  const changeProductStatus = (elem?: React.ReactNode, idx?: number) => {
    if (idx === -1) {
      return state.isactive ? SPECIAL_PRODUCTS_STATUS.ACTIVE : SPECIAL_PRODUCTS_STATUS.INACTIVE
    }
    const newVal = Object.values(SPECIAL_PRODUCTS_STATUS)[idx || 0]
    const newStatus = !!(newVal === SPECIAL_PRODUCTS_STATUS.ACTIVE) !== state.isactive
    if (newStatus) {
      dispatch({
        type: 'isactive',
        payload: !!(newVal === SPECIAL_PRODUCTS_STATUS.ACTIVE),
      })
    }
    return newVal
  }

  const onSubmitHandler = () => {
    const payload: SpecialProductsDetail = {
      design_type: state.design_type,
      design_no: state.design_no,
      price: parseFloat(`${state.price || 0}`),
      solitaire_details: state.solitaire_details,
      mount_details: state.mount_details,
      gross_weight: parseFloat(`${state.gross_weight || 0}`),
      net_weight: parseFloat(`${state.net_weight || 0}`),
      isactive: state.isactive,
      usd_price: parseFloat(`${state.usd_price || 0}`),
      usd_uae_price: parseFloat(`${state.usd_uae_price || 0}`),
    }

    if (query?.id && query?.id !== 'new') {
      payload.id = parseInt(`${query.id}`, 10) as unknown as number
    }
    showLoader()
    createSpecialProducts(payload)
      .then(() => {
        console.log('It is successfully created')
        notify(query?.id === 'new' ? NOTIFICATION_MESSAGES.SPECIAL_PRODUCT_CREATE_SUCCESS : NOTIFICATION_MESSAGES.SPECIAL_PRODUCT_UPDATE_SUCCESS)
        push('/admin/special-products')
        hideLoader()
      })
      .catch((err) => {
        hideLoader()
        notifyErr(query?.id === 'new' ? NOTIFICATION_MESSAGES.SPECIAL_PRODUCT_CREATE_FAILED : NOTIFICATION_MESSAGES.SPECIAL_PRODUCT_UPDATE_FAILED)
        console.log('Error', err)
      })
  }

  const onEditClickHandler = () => setEditMode(true)

  return (
    <div className="flex-1 w-full mt-1 bg-gray-50 pt-10 px-4 rounded-lg">
      <SectionContainer className="mt-6">
        <div>
          <h1 className="py-2 font-medium text-base">Product Details:</h1>
        </div>
        <div className="flex-row pt-5">
          <div className="flex justify-between pt-5 ">
            <InputText
              className="w-96"
              containerClass="w-96"
              label="Mount Details"
              name="mountdetail"
              onChange={onChangeHandlerCreator('mount_details')}
              placeholder="Mount Details"
              type="text"
              value={state.mount_details}
              disabled={!editMode}
            />
            <InputText
              className="w-96"
              containerClass="w-96"
              label="Solitaire Details"
              name="solitairedetail"
              onChange={onChangeHandlerCreator('solitaire_details')}
              placeholder="Solitaire Details"
              type="text"
              value={state.solitaire_details}
              disabled={!editMode}
            />
          </div>
        </div>
        <div className="flex-row pt-1">
          <div className="flex justify-between pt-5 ">
            <InputText
              className="w-96"
              containerClass="w-96"
              label="Product Description"
              name="designtype"
              onChange={onChangeHandlerCreator('design_type')}
              placeholder="Product Description"
              type="text"
              value={state.design_type}
              disabled={!editMode}
            />
            <InputText
              className="w-96"
              containerClass="w-96"
              label="Retail Price INR"
              name="price"
              onChange={onChangeHandlerCreator('price')}
              placeholder="Retail Price INR"
              type="number"
              value={`${state.price}`}
              disabled={!editMode}
            />
          </div>
        </div>
        <div className="flex-row pt-1">
          <div className="flex justify-between pt-5 ">
            <InputText
              className="w-96"
              containerClass="w-96"
              label="Retail Price US"
              name="usd_price"
              onChange={onChangeHandlerCreator('usd_price')}
              type="number"
              value={`${state.usd_price}`}
              disabled={!editMode}
            />
            <InputText
              className="w-96"
              containerClass="w-96"
              label="Retail Price AED"
              name="usd_uae_price"
              onChange={onChangeHandlerCreator('usd_uae_price')}
              type="number"
              value={`${state.usd_uae_price}`}
              disabled={!editMode}
            />
          </div>
        </div>
        <div className="flex-row pt-1">
          <div className="flex justify-between pt-5">
            <InputText
              className="w-96"
              containerClass="w-96"
              label="Design no:"
              name="designno"
              onChange={onChangeHandlerCreator('design_no')}
              placeholder="Design no:"
              type="text"
              value={state.design_no}
              disabled={!editMode}
            />
            <Dropdown
              options={Object.values(SPECIAL_PRODUCTS_STATUS)}
              label="Status"
              value={state.isactive ? SPECIAL_PRODUCTS_STATUS.ACTIVE : SPECIAL_PRODUCTS_STATUS.INACTIVE}
              disabled={!editMode}
              selected={changeProductStatus}
              className="w-96"
            />
          </div>
        </div>
        <div className="flex-row pt-1">
          <div className="flex justify-between pt-5 ">
            <InputText
              className="w-96"
              containerClass="w-96"
              label="Gross Weight (in gms)"
              name="grossweight"
              onChange={onChangeHandlerCreator('gross_weight')}
              placeholder="Gross Weight (in gms)"
              type="number"
              value={`${state.gross_weight}`}
              disabled={!editMode}
              step="0.001"
            />
            <InputText
              className="w-96"
              containerClass="w-96"
              label="Net Weight (in gms)"
              name="netweight"
              onChange={onChangeHandlerCreator('net_weight')}
              placeholder="Status"
              type="number"
              value={`${state.net_weight}`}
              disabled={!editMode}
              step="0.001"
            />
          </div>
        </div>
        <div className="mt-6">
          <div className="mt-6 flex items-center justify-center gap-x-6 my-5 py-5">
            <Link href="/admin/special-products">
              <button
                type="submit"
                className="inline-flex items-center justify-center px-4 py-2 bg-Chinese-Black-sidebar border border-transparent rounded-md font-semibold capitalize text-white hover:bg-Chinese-Black-sidebar active:bg-Chinese-Black-sidebar focus:outline-none focus:bg-Chinese-Black-sidebar focus:ring focus:ring-red-200 disabled:opacity-25 transition"
              >
                Close
              </button>
            </Link>
            {editMode ? (
              <button
                type="submit"
                onClick={onSubmitHandler}
                className=" w-72 rounded-md bg-Chinese-Black-sidebar py-2 text-sm font-semibold text-white shadow-sm hover:bg-Chinese-Black-sidebar focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 px-12"
              >
                Submit
              </button>
            ) : (
              <button
                type="button"
                onClick={onEditClickHandler}
                className=" w-72 rounded-md bg-Chinese-Black-sidebar py-2 text-sm font-semibold text-white shadow-sm hover:bg-Chinese-Black-sidebar focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 px-12"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </SectionContainer>
    </div>
  )
}

export default SpecialProductDetailScreen

import { useRouter } from 'next/router'
import { useEffect, useReducer } from 'react'

import { createSpecialProducts, getSpecialProductsDetail } from '@/api'
import InputText from '@/components/common/input-text'
import { SpecialProductsDetail } from '@/interface'

import SectionContainer from './sub-components/section-container'

interface SpecialProductsDetailAction {
  type: string
  payload?: string | SpecialProductsDetail
}

const initialState: SpecialProductsDetail = {
  //isactive: false,
  design_type: '',
  design_no: '',
  price: '',
  solitaire_details: '',
  mount_details: '',
  gross_weight: '',
  net_weight: '',
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
  const [state, dispatch] = useReducer(SpecialProductsDetailReducer, initialState)

  const { query, push } = useRouter()
  useEffect(() => {
    if (!query.id || query.id === 'new') {
      return
    }
    /**/
    getSpecialProductsDetail(query?.id as unknown as number)
      .then((res) => {
        dispatch({
          type: 'ALL',
          payload: { ...(res.data.data as unknown as SpecialProductsDetail) },
        })
      })
      .catch((err) => {
        console.log('errr', err)
      })
  }, [query?.id])

  const onChangeHandlerCreator = (fieldname: string) => {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      dispatch({
        type: fieldname,
        payload: (e.target as HTMLInputElement).value,
      })
  }

  const onSubmitHandler = () => {
    const payload: SpecialProductsDetail = {
      //...state,
      id: state.id,
      design_type: state.design_type,
      design_no: state.design_no,
      price: state.price,
      solitaire_details: state.solitaire_details,
      mount_details: state.mount_details,
      gross_weight: state.gross_weight,
      net_weight: state.net_weight,
    }

    if (query?.id) {
      payload.id = query.id as unknown as number
    }

    createSpecialProducts(payload)
      .then(() => {
        console.log('It is successfully created')
        push('/admin/resale')
      })
      .catch((err) => console.log('Error', err))
  }

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
            />
            <InputText
              className="w-96"
              containerClass="w-96"
              label="Retail Price"
              name="price"
              onChange={onChangeHandlerCreator('price')}
              placeholder="Retail Price"
              type="number"
              value={state.price}
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
            />
            <InputText
              className="w-96"
              containerClass="w-96"
              label="Status"
              name="status"
              onChange={onChangeHandlerCreator('isactive')}
              placeholder="Status"
              type="number"
              //value={state.isactive}
              value="false"
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
              value={state.gross_weight}
            />
            <InputText
              className="w-96"
              containerClass="w-96"
              label="Net Weight (in gms)"
              name="netweight"
              onChange={onChangeHandlerCreator('net_weight')}
              placeholder="Status"
              type="number"
              value={state.net_weight}
            />
          </div>
        </div>
        <div className="mt-6">
          <div className="mt-6 flex items-center justify-center gap-x-6 my-5 py-5">
            <button
              type="submit"
              onClick={onSubmitHandler}
              className=" w-72 rounded-md bg-Chinese-Black-sidebar py-2 text-sm font-semibold text-white shadow-sm hover:bg-Chinese-Black-sidebar focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 px-12"
            >
              Submit
            </button>
          </div>
        </div>
      </SectionContainer>
    </div>
  )
}

export default SpecialProductDetailScreen

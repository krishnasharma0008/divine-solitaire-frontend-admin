import dayjs from 'dayjs'
import utcPlugin from 'dayjs/plugin/utc'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect, useReducer, useState } from 'react'
import DataTable from 'react-data-table-component'

import { createUser, getUserDetail } from '@/api'
import { MetaDetailsCard } from '@/components/common'
import DatePicker from '@/components/common/date-picker'
import InputText from '@/components/common/input-text'
import CalendarIcon from '@/components/icons/calendar-icon'
import LoaderContext from '@/context/loader-context'
import { Portfolio, User, Wishlist } from '@/interface'
import { formatByCurrency } from '@/util'

import SectionContainer from './sub-components/section-container'
import { portfolioColumns, wishlistColumns } from './user-detail-screen-table-columns'

dayjs.extend(utcPlugin)

interface UserDetailAction {
  type: string
  payload?: User | string
}

const initialState: User = {
  aadhar: '',
  address: '',
  ceatedat: '',
  city: '',
  contactno: '',
  doanniv: '',
  dob: '',
  drivinglic: '',
  email: '',
  fname: '',
  id: 0,
  lactivity: '',
  lactivityat: '',
  lname: '',
  pan: '',
  pfimage: '',
  pincode: '',
  state: '',
  vsource: '',
}

const UserDetailReducer = (state: User, action: UserDetailAction) => {
  if (action.type === 'ALL') {
    return { ...state, ...(action.payload as unknown as User) }
  }
  return { ...state, [action.type]: action.payload }
}

const calculateTotalPortfolioAmt = (portfolio: Array<Portfolio>): number =>
  portfolio.reduce((acc: number, item: { current_price: number }) => acc + item.current_price, 0)

const UserDetailScreen: React.FC = () => {
  const [state, dispatch] = useReducer(UserDetailReducer, initialState)
  const [portfolio, setPortfolio] = useState<Array<Portfolio>>([])
  const [wishlist, setWishlist] = useState<Array<Wishlist>>([])
  const { showLoader, hideLoader } = useContext(LoaderContext)

  const [editMode, setEditMode] = useState<boolean>(false)

  const DateFormat = 'YYYY-MM-DD HH:mm:ss'

  const { query, push } = useRouter()

  useEffect(() => {
    if (!query.id) {
      return
    }

    showLoader()
    getUserDetail(query?.id as unknown as number)
      .then((res) => {
        dispatch({
          type: 'ALL',
          payload: { ...(res.data.data.userinfo as unknown as User) },
        })
        //console.log('dob:', dayjs(state.dob, 'DD MMMM YYYY').utc().format())
        //const dt = state.dob //'2023-07-10T00:00:00Z'
        //console.log('dob 1', dayjs.utc(state.dob).format('YYYY-MM-DD HH:mm:ss'))
        //console.log(new Date(dayjs.utc(state.dob).format()))
        //console.log('dob 2', state.dob)
        //console.log('formatted date:', dayjs(state?.lactivityat).format('DD MMMM YYYY'))
        setPortfolio(res.data.data.portfolio)
        setWishlist(res.data.data.Wishlist)
        hideLoader()
      })

      .catch((err) => {
        hideLoader()
        console.log('errr', err)
      })
  }, [hideLoader, query.id, showLoader])

  const onSubmitHandler = () => {
    const payload: Partial<User> = {
      //...state,
      fname: state.fname,
      email: state.email,
      contactno: state.contactno,
      address: state.address,
      state: state.state,
      city: state.city,
      pincode: state.pincode,
      dob: new Date(state.dob || Date.now()).toISOString(),
      doanniv: new Date(state.doanniv || Date.now()).toISOString(),
    }
    //console.log(payload)
    if (query?.id) {
      payload.id = query.id as unknown as number
    }
    showLoader()
    createUser(payload)
      .then(() => {
        console.log('It is successfully created')
        push('/admin/user')
        hideLoader()
      })
      .catch((err) => {
        hideLoader()
        console.log('Error', err)
      })
  }

  const onChangeHandlerCreator = (fieldname: string) => {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      dispatch({
        type: fieldname,
        payload: (e.target as HTMLInputElement).value,
      })
  }

  const onDateChangeHandler = (fieldname: string) => (date: Date) => {
    dispatch({
      type: fieldname,
      payload: date.toISOString(),
    })
  }

  const CustomStyles = {
    header: {
      style: {
        justifyContent: 'flex-start',
      },
    },
    headRow: {
      style: {
        borderBottomWidth: '0',
      },
    },
    rows: {
      style: {
        '&:not(:last-of-type)': {
          borderBottomWidth: '0',
          borderBottomColor: 'white',
          justifyContent: 'flex-center',
        },
      },
    },
  }

  const onEditClickHandler = () => setEditMode(true)

  return (
    <div className="flex-1 w-full mt-1 bg-gray-50 pt-10 px-4 rounded-lg">
      <SectionContainer>
        <MetaDetailsCard
          label="User Activity :"
          fields={[
            { name: 'Source', value: state?.vsource },
            {
              name: 'Date of sign Up',
              value: dayjs(state?.ceatedat).format('DD MMMM YYYY'),
            },
            { name: 'Last Activity Date', value: state?.lactivityat ? dayjs(state?.lactivityat).format('DD MMMM YYYY') : '-' },
            {
              name: 'Purchase Amount',
              value: formatByCurrency(parseFloat(`${calculateTotalPortfolioAmt(portfolio || [])}`)),
            },
            // { name: 'Active request', value: 'Yes' },
          ]}
        />
      </SectionContainer>

      <SectionContainer className="mt-6">
        <div>
          <h1 className="py-2 font-medium text-base">Personal Details :</h1>
        </div>
        <div className="flex-row pt-5">
          <InputText
            className="w-full"
            label="Name"
            name="name"
            placeholder="Name"
            type="text"
            value={state?.fname || ''}
            onChange={onChangeHandlerCreator('fname')}
            disabled={!editMode}
          />

          <div className="flex justify-between pt-5 ">
            <InputText
              className="w-full"
              containerClass="w-1/4"
              label="Email"
              name="email"
              placeholder="Email"
              type="text"
              onChange={onChangeHandlerCreator('email')}
              value={state?.email || ''}
              disabled={!editMode}
            />
            <InputText
              className="w-full"
              containerClass="w-1/4"
              label="Mobile No."
              name="mno"
              placeholder="Mobile No."
              type="text"
              onChange={onChangeHandlerCreator('contactno')}
              value={state?.contactno || ''}
              disabled={!editMode}
            />
          </div>
        </div>

        <div className="flex-row pt-5">
          <InputText
            className="w-full"
            label="Address"
            name="address"
            placeholder="Address"
            type="text"
            onChange={onChangeHandlerCreator('address')}
            value={state?.address || ''}
            disabled={!editMode}
          />

          <div className="flex justify-between pt-5 ">
            <InputText
              label="State"
              name="state"
              placeholder="State"
              type="text"
              onChange={onChangeHandlerCreator('state')}
              value={state?.state || ''}
              disabled={!editMode}
            />
            <InputText
              label="City"
              name="city"
              placeholder="City"
              type="text"
              value={state?.city || ''}
              onChange={onChangeHandlerCreator('city')}
              disabled={!editMode}
            />
            <InputText
              label="Pin Code"
              name="pincode"
              placeholder="Pin Code"
              type="text"
              onChange={onChangeHandlerCreator('pincode')}
              value={state?.pincode || ''}
              disabled={!editMode}
            />
          </div>
          <div className="flex justify-between pt-5 ">
            <DatePicker
              onChange={onDateChangeHandler('dob')}
              label="Date of Birth"
              //value={new Date(state.dob || Date.now())}
              value={state.dob ? new Date(dayjs.utc(state.dob).format(DateFormat)) : null}
              className=""
              showIcon={editMode}
              icon={CalendarIcon}
            />
            <DatePicker
              onChange={onDateChangeHandler('doanniv')}
              label="Date of Anniversary"
              //value={new Date(state.doanniv || Date.now())}
              value={state.doanniv ? new Date(dayjs.utc(state.doanniv).format(DateFormat)) : null}
              className=""
              showIcon={editMode}
              icon={CalendarIcon}
            />
          </div>
        </div>
      </SectionContainer>
      {portfolio && (
        <SectionContainer className="flex-1 pt-5 mt-6">
          <div className="flex-1 w-full">
            <div className="bg-white ">
              <div>
                <DataTable
                  title={
                    <>
                      <span className="inline-block">Portfolio</span>
                      <span className="inline-block pl-3 select-none text-gray-500 text-left sm:text-sm">
                        {`Total Portfolio Value - ${formatByCurrency(calculateTotalPortfolioAmt(portfolio))}`}
                      </span>
                    </>
                  }
                  columns={portfolioColumns}
                  data={portfolio}
                  customStyles={CustomStyles}
                />
              </div>
            </div>
          </div>
        </SectionContainer>
      )}
      {wishlist && (
        <SectionContainer className="flex-1 pt-5 mt-6">
          <div className="flex-1 w-full">
            <div className="bg-white ">
              <div className="">
                <DataTable title="Wishlist" columns={wishlistColumns} data={wishlist} customStyles={CustomStyles} />
              </div>
            </div>
          </div>
        </SectionContainer>
      )}

      <SectionContainer className="mt-6">
        <div className="mt-6 flex items-center justify-center gap-x-6 my-5 py-5">
          <Link href="/admin/user">
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
              className="rounded-md bg-Chinese-Black-sidebar py-2 text-sm font-semibold text-white shadow-sm hover:bg-Chinese-Black-sidebar focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 px-12"
            >
              Submit
            </button>
          ) : (
            <button
              type="button"
              onClick={onEditClickHandler}
              className="rounded-md bg-Chinese-Black-sidebar py-2 text-sm font-semibold text-white shadow-sm hover:bg-Chinese-Black-sidebar focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 px-12"
            >
              Edit
            </button>
          )}
        </div>
      </SectionContainer>
    </div>
  )
}

export default UserDetailScreen

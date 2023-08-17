import React, { useEffect, useContext, useState } from 'react'

import { getDasboardUserDetail } from '@/api/dashboard-detail'
import LoaderContext from '@/context/loader-context'
import { User_Activity, Insurance_Activity, Resale_Activity, Store_Activity } from '@/interface'

import DashboardMetaData from './sub-components/dashboard-meta-data'

const initialState: User_Activity = {
  total: '',
  last7days: '',
  last1month: '',
  last1year: '',
}

const initialStateInsurance: Insurance_Activity = {
  cancelled: '',
  inprocess: '',
  active: '',
  expired: '',
}

const initialStateResale: Resale_Activity = {
  buyback: '',
  upgrade: '',
}

const initialStateStore: Store_Activity = {
  total: '',
}

const DashboardScreen = () => {
  const [userActivity, setUserActivity] = useState<User_Activity>(initialState)
  const [insuranceActivity, setInsuranceActivity] = useState<Insurance_Activity>(initialStateInsurance)
  const [resaleActivity, setResaleActivity] = useState<Resale_Activity>(initialStateResale)
  const [storeActivity, setStoreActivity] = useState<Store_Activity>(initialStateStore)
  const { showLoader, hideLoader } = useContext(LoaderContext)
  //const { notifyErr } = useContext(NotificationContext)

  const dataObj = [
    {
      title: 'Users',
      items: [
        {
          title: 'Total Users',
          content: userActivity.total,
        },
        {
          title: 'Last 7 days addition',
          content: userActivity.last7days,
        },
        {
          title: '1 Month active addition',
          content: userActivity.last1month,
        },
        {
          title: '1 year active addition',
          content: userActivity.last1year,
        },
      ],
    },
    // {
    //   title: 'Secondary Sale',
    //   items: [
    //     {
    //       title: 'Open UID Requests',
    //       content: '215',
    //     },
    //   ],
    // },
    {
      title: 'Insurance',
      items: [
        {
          title: 'Active',
          content: insuranceActivity.active,
        },
        {
          title: 'Cancelled',
          content: insuranceActivity.cancelled,
        },
        {
          title: 'In Process',
          content: insuranceActivity.inprocess,
        },
        {
          title: 'Expired',
          content: insuranceActivity.expired,
        },
      ],
    },
    {
      title: 'Resale',
      items: [
        {
          title: 'Upgrade',
          content: resaleActivity.upgrade,
        },
        {
          title: 'Buyback',
          content: resaleActivity.buyback,
        },
      ],
    },
    // {
    //   title: 'Loan Requests',
    //   items: [
    //     {
    //       title: 'Fresh loan requests',
    //       content: '235',
    //     },
    //     {
    //       title: 'Fresh upgrade requests',
    //       content: '23',
    //     },
    //   ],
    // },
    {
      title: 'Store Locator',
      items: [
        {
          title: 'Total Stores',
          content: storeActivity.total,
        },
      ],
    },
    // {
    //   title: 'Solitaire Coin',
    //   items: [
    //     {
    //       title: 'Active Products',
    //       content: '45',
    //     },
    //   ],
    // },
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        showLoader()
        const response = await getDasboardUserDetail()
        setUserActivity(response.data.data.user_activity)
        setInsuranceActivity(response.data.data.policy)
        setResaleActivity(response.data.data.resale)
        setStoreActivity(response.data.data.store)
        hideLoader()
      } catch (error) {
        hideLoader()
        console.log(error)
      }
    }

    fetchData()
  }, [hideLoader, showLoader])

  return (
    <div className="font-body bg-white w-full min-h-screen p-6 flex flex-col gap-9 rounded">
      {dataObj.map(({ items, title }) => (
        <DashboardMetaData items={items} title={title} key={title} />
      ))}
    </div>
  )
}

export default DashboardScreen

import React, { useEffect, useState } from 'react'

import { getDasboardUserDetail } from '@/api/dashboard-detail'
import { User_Activity } from '@/interface'

import DashboardMetaData from './sub-components/dashboard-meta-data'

const initialState: User_Activity = {
  total: '',
  last7days: '',
  last1month: '',
  last1year: '',
}

const DashboardScreen = () => {
  const [userActivity, setUserActivity] = useState<User_Activity>(initialState)

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
          title: 'Active Insurance',
          content: '-',
        },
        {
          title: 'Fresh Insurance Request Open',
          content: '-',
        },
        {
          title: 'Renewal Insurance Request Open',
          content: '-',
        },
        {
          title: 'Renewal Request',
          content: '-',
        },
      ],
    },
    {
      title: 'Resale',
      items: [
        {
          title: 'Fresh buyback requests',
          content: '-',
        },
        {
          title: 'Fresh upgrade requests',
          content: '-',
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
          title: 'Active Stores',
          content: '-',
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
        const response = await getDasboardUserDetail()
        setUserActivity(response.data.data.user_activity)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="font-body bg-white w-full min-h-screen p-6 flex flex-col gap-9 rounded">
      {dataObj.map(({ items, title }) => (
        <DashboardMetaData items={items} title={title} key={title} />
      ))}
    </div>
  )
}

export default DashboardScreen

import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react' //
import DataTable, { TableColumn, TableStyles } from 'react-data-table-component'

import getUserList from '@/api/user'
//import { getUserList, getUserListWithFilter } from '@/api/user'
import SearchBox from '@/components/common/searchbox'
import LoaderContext from '@/context/loader-context'
import { USER_SEARCH_LIST } from '@/enums'
import { User } from '@/interface'

export default function User() {
  const [user, setUser] = useState<Array<User>>([])
  const { showLoader, hideLoader } = useContext(LoaderContext)

  const [Dropvalue, setDropvalue] = useState<string>(USER_SEARCH_LIST.NAME)
  const [search, setSearch] = useState<string>('')

  const { push } = useRouter()

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const changeProductStatus = (elem?: React.ReactNode, idx?: number) => {
    if (idx === -1) {
      setDropvalue(USER_SEARCH_LIST.NAME)
      return Dropvalue
    }
    setDropvalue(Object.values(USER_SEARCH_LIST)[idx || 0])
    return Dropvalue // Make sure to return a value here
  }

  const getlistdata = async () => {
    //fieldName?: string, fieldValue?: string, pageNo?: number
    try {
      showLoader()
      const result = await getUserList() //getUserListWithFilter(fieldName, fieldValue, pageNo)
      setUser(result.data.data ?? [])
      hideLoader()
    } catch (error) {
      hideLoader()
      console.log(error)
    }
  }

  const SearchClick = () => {
    console.log('click check')
    //getlistdata(Dropvalue.toLocaleLowerCase(), search, 0)
  }

  const onPageClick = (pageIndex: number) => {
    console.log('onPageClick called with pageIndex:', pageIndex)
    //getlistdata(Dropvalue.toLocaleLowerCase(), search, pageIndex)
  }
  const onRowClicked = (id: number) => push(`/admin/user-detail/${id}`)

  const columns: Array<TableColumn<User>> = [
    {
      name: 'Sr. No.',
      cell: (row, index: number) => index + 1,
      width: '90px',
    },
    {
      name: 'Source',
      selector: (row) => row.vsource || '',
    },
    {
      name: 'Name',
      selector: (row) => (row.fname === null ? ' ' : row.fname) + ' ' + (row.lname === null ? ' ' : row.lname),
      sortable: true,
    },
    {
      name: 'Mobile No.',
      selector: (row) => row.contactno || '',
    },
    {
      name: 'E-mail',
      selector: (row) => row.email || '',
    },
    {
      name: 'Date of sign Up',
      selector: (row) => dayjs(row?.ceatedat).format('DD MMMM YYYY') || '',
    },
  ]

  useEffect(() => {
    getlistdata()
  }, [])

  const CustomStyles: TableStyles = {
    headRow: {
      style: {
        backgroundColor: '#00A0B6',
        color: 'white',
      },
    },
  }

  const CustomPagination = {
    rowsPerPageText: ' ',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'All',
  }

  return (
    <div className="flex-1 w-full pt-5" style={{ height: '500px' }}>
      <div className="bg-white">
        <div className=" px-5 pt-5">
          <span className="font-Montserrat  font-normal text-black text-2xl">Users</span>
        </div>
        <div className="w-full pt-5 px-5">
          <SearchBox
            options={Object.values(USER_SEARCH_LIST)}
            selected={changeProductStatus}
            value={search}
            onChange={changeHandler}
            onSearchClick={SearchClick}
          />
        </div>
        <div className="p-5">
          <DataTable
            columns={columns}
            data={user}
            customStyles={CustomStyles}
            onRowClicked={(e) => onRowClicked(e.id!)}
            pagination
            fixedHeader
            fixedHeaderScrollHeight="450px"
            selectableRowsHighlight
            highlightOnHover
            pointerOnHover
            paginationComponentOptions={CustomPagination}
            onChangePage={onPageClick}
          />
        </div>
      </div>
    </div>
  )
}

import { Button } from '@material-tailwind/react'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react' //
import DataTable, { TableColumn, TableStyles } from 'react-data-table-component'

import { DownloadUserExcel } from '@/api'
import getUserListWithFilter from '@/api/user'
//import { getUserList, getUserListWithFilter } from '@/api/user'
import InputText from '@/components/common/input-text'
import SearchBox from '@/components/common/searchbox'
import LoaderContext from '@/context/loader-context'
import { USER_SEARCH_LIST } from '@/enums'
import { User } from '@/interface'

export default function User() {
  const [user, setUser] = useState<Array<User>>([])
  const { showLoader, hideLoader } = useContext(LoaderContext)

  const [Dropvalue, setDropvalue] = useState<string>(USER_SEARCH_LIST.NAME)
  const [search, setSearch] = useState<string>('')

  /** */
  const [totalPages, setTotalPage] = useState<number>(1)
  const [totalRows, setTotalRows] = useState<number>(1)
  const [selectedPage, setSelectedPage] = useState<number>(1)

  const onSelectedPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputPage = parseInt(event.target.value, 10)
    //console.log(inputPage)
    const selectedPageIndex = inputPage - 1
    if (selectedPageIndex >= 0 && selectedPageIndex < totalPages) {
      setSelectedPage(isNaN(inputPage) ? 1 : inputPage)
    }
  }

  const goToSelectedPage = () => {
    //console.log(selectedPage)
    const selectedPageIndex = selectedPage - 1
    if (selectedPageIndex >= 0 && selectedPageIndex < totalPages) {
      onPageClick(selectedPageIndex)
    }
  }
  /** */

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
    return Dropvalue
  }

  const getlistdata = async (fieldName?: string, fieldValue?: string, pageNo?: number) => {
    try {
      showLoader()
      const result = await getUserListWithFilter(fieldName, fieldValue, pageNo)
      setUser(result.data.data ?? [])
      setTotalPage(result.data.total_page)
      setTotalRows(result.data.total_row)
      hideLoader()
    } catch (error) {
      hideLoader()
      console.log(error)
    }
  }

  const SearchClick = () => {
    console.log('click check')
    setSelectedPage(1)
    getlistdata(Dropvalue.toLocaleLowerCase() === 'mobile' ? 'mobno' : Dropvalue.toLocaleLowerCase(), search, selectedPage)
  }

  const onPageClick = (newPageNumber: number) => {
    //console.log('onPageClick called with pageIndex:', newPageNumber)
    setSelectedPage(isNaN(newPageNumber) ? 1 : newPageNumber)
    getlistdata(Dropvalue.toLocaleLowerCase() === 'mobile' ? 'mobno' : Dropvalue.toLocaleLowerCase(), search, newPageNumber)
  }
  const onRowClicked = (id: number) => push(`/admin/user-detail/${id}`)

  const ExcelDownload = async () => {
    try {
      showLoader()
      const result = await DownloadUserExcel()
      const href = window.URL.createObjectURL(new Blob([result.data]))

      //const filename = result.headers['content-disposition']
      //console.log(filename)
      // .split(';')
      // .find((n: string) => n.includes('filename='))
      // .replace('filename=', '')
      // .trim()

      const anchorElement = document.createElement('a')

      anchorElement.href = href
      anchorElement.download = `User_${new Date()}.xlsx`

      document.body.appendChild(anchorElement)
      anchorElement.click()

      document.body.removeChild(anchorElement)
      window.URL.revokeObjectURL(href)

      hideLoader()
    } catch (error) {
      hideLoader()
      console.log(error)
    }
  }

  const DownloadClick = () => {
    ExcelDownload()
  }

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
    getlistdata('', '', 1)
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
    noRowsPerPage: true,
  }

  return (
    <div className="flex-1 w-full pt-5" style={{ height: '500px' }}>
      <div className="bg-white">
        <div className=" px-5 pt-5 mb-5">
          <span className="font-Montserrat  font-normal text-black text-2xl">Users</span>
        </div>
        <div className="w-full flex justify-end">
          <div className="w-full px-5">
            <SearchBox
              options={Object.values(USER_SEARCH_LIST)}
              selected={changeProductStatus}
              value={search}
              onChange={changeHandler}
              onSearchClick={SearchClick}
            />
          </div>
          <div className="w-1/3">
            <Button color="white" className="capitalize" onClick={DownloadClick}>
              Download Excel
            </Button>
          </div>
        </div>
        <div className="p-5">
          <DataTable
            columns={columns}
            data={user}
            customStyles={CustomStyles}
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            onRowClicked={(e) => onRowClicked(e.id!)}
            pagination
            paginationServer
            fixedHeader
            fixedHeaderScrollHeight="450px"
            selectableRowsHighlight
            highlightOnHover
            pointerOnHover
            paginationComponentOptions={CustomPagination}
            onChangePage={onPageClick}
            //paginationServer
            paginationTotalRows={totalRows}
            paginationDefaultPage={selectedPage}
            //paginationPerPage={10}
            // paginationComponentOptions={{
            //   noRowsPerPage: true,
            //   selectAllRowsItem: true,
            // }}
            //onChangePage={(page) => setPage(page)}
          />
          <button
            type="button"
            className="bg-[#00A0B6] text-white px-5 py-1.5 rounded block"
            style={{ marginTop: user.length ? -40 : 0, marginLeft: 90 }}
            onClick={goToSelectedPage}
          >
            Go to Page
          </button>
        </div>
        <div className="flex" style={{ marginTop: user.length ? -55 : 0, marginLeft: 45 }}>
          <InputText
            className="!w-[3rem] !border-gray_light !h-[2.5rem] !pt-0 !pb-0"
            onChange={onSelectedPageChange}
            placeholder="Go to Page"
            type="text"
            value={selectedPage.toString()}
            min={1}
            max={totalPages}
          />
        </div>
      </div>
    </div>
  )
}

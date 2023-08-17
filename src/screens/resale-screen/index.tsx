/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@material-tailwind/react'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import DataTable, { TableColumn } from 'react-data-table-component'

import getResaleListWithFilter from '@/api/resale'
import { DownloadSaleExcel } from '@/api/resale-detail'
//import Dropdown from '@/components/common/dropdown'
import InputText from '@/components/common/input-text'
import SearchBox from '@/components/common/searchbox'
import LoaderContext from '@/context/loader-context'
import RESALE_SEARCH_LIST from '@/enums/resale-search-list'
import { Resale } from '@/interface'

export default function Resalelist() {
  const [resale, setResale] = useState<Array<Resale>>([])

  const { showLoader, hideLoader } = useContext(LoaderContext)
  const navigate = useRouter()

  /** Searching */

  const [SearchDropvalue, setSearchDropvalue] = useState<string>(RESALE_SEARCH_LIST.UID)

  const [search, setSearch] = useState<string>('')
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

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const changeStatus = (elem?: React.ReactNode, idx?: number) => {
    if (idx === -1) {
      setSearchDropvalue(RESALE_SEARCH_LIST.UID)
      return SearchDropvalue
    }
    setSearchDropvalue(Object.values(RESALE_SEARCH_LIST)[idx || 0])
    //console.log(SearchDropvalue)
    return SearchDropvalue
  }

  const SearchClick = () => {
    //console.log('click check')

    setSelectedPage(1)
    getlistdata(chkSearchDropvalue(SearchDropvalue), search, selectedPage)
  }

  const onPageClick = (newPageNumber: number) => {
    console.log('onPageClick called with pageIndex:', newPageNumber)
    setSelectedPage(isNaN(newPageNumber) ? 1 : newPageNumber)
    getlistdata(chkSearchDropvalue(SearchDropvalue), search, newPageNumber)
  }

  const chkSearchDropvalue = (dvalue: string) => {
    if (dvalue === 'UID') {
      dvalue = 'uid'
    } else if (dvalue === 'Request No') {
      dvalue = 'requestno'
    }
    // else if (dvalue === 'Date Of Request') {
    //   dvalue = 'createdat'
    // }
    else if (dvalue === 'Name') {
      dvalue = 'name'
    }
    return dvalue
  }

  /** */

  const getlistdata = async (fieldName?: string, fieldValue?: string, pageNo?: number) => {
    try {
      showLoader()
      const result = await getResaleListWithFilter(fieldName, fieldValue, pageNo)
      setResale(result.data.data ?? [])
      setTotalPage(result.data.total_page)
      setTotalRows(result.data.total_row)
      hideLoader()
    } catch (error) {
      hideLoader()
      console.log(error)
    }
  }

  const onRowClicked = (id: number) => {
    //console.log(id);
    navigate.push(`/admin/resale-detail/${id}`)
  }

  const columns: TableColumn<any>[] = [
    {
      name: 'Sr. No.',
      cell: (row: any, index: number) => index + 1,
      sortable: true,
      width: '90px',
    },
    {
      name: 'UID',
      selector: (row) => row.uid,
      sortable: true,
    },
    {
      name: 'Status Request',
      cell: (row) => (
        <div
          className={`w-full text-center text-white font-bold py-2 px-4 rounded ${
            row.rstatus === 'Open'
              ? 'bg-light-muted-azure '
              : row.rstatus === 'Reject'
              ? 'bg-red-400'
              : row.rstatus === 'InReview'
              ? 'bg-orange-300	'
              : 'bg-green	'
          }`}
          onClick={() => onRowClicked(row.id)}
        >
          {row.rstatus}
        </div>
      ),
      selector: (row) => row.rstatus || '',
      sortable: true,
    },
    {
      name: 'Request No.',
      selector: (row) => row.requestno || '',
      sortable: true,
    },
    {
      name: 'Request Type',
      selector: (row) => row.etype || '',
      sortable: true,
    },
    {
      name: 'Date of Request',
      selector: (row) => dayjs(row.createdat).format('DD MMM,YYYY') || '',
      sortable: true,
    },
    {
      name: 'Name',
      selector: (row) => row.phname || '',
      sortable: true,
    },
  ]

  useEffect(() => {
    getlistdata()
  }, [])

  const CustomStyles = {
    headRow: {
      style: {
        backgroundColor: '#00A0B6',
        color: 'white',
      },
    },
  }

  /* Custom Pagination*/
  const CustomPagination = {
    rowsPerPageText: ' ',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'All',
  }

  const ExcelDownload = async () => {
    try {
      showLoader()
      const result = await DownloadSaleExcel()
      const href = window.URL.createObjectURL(new Blob([result.data]))

      //const filename = result.headers['content-disposition']
      //console.log(filename)
      // .split(';')
      // .find((n: string) => n.includes('filename='))
      // .replace('filename=', '')
      // .trim()

      const anchorElement = document.createElement('a')

      anchorElement.href = href
      anchorElement.download = `Resale_${new Date()}.xlsx`

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

  return (
    <div className="flex-1 w-full pt-5" style={{ height: '500px' }}>
      <div className="bg-white">
        <div className="px-5 pt-5">
          <span className="font-Montserrat  font-normal text-black text-2xl">Resale</span>
        </div>
        <div className="p-5">
          <div className="w-full flex justify-end py-5">
            <div className="w-full pr-5">
              <SearchBox
                options={Object.values(RESALE_SEARCH_LIST)}
                selected={changeStatus}
                value={search}
                onChange={changeHandler}
                onSearchClick={SearchClick}
              />
            </div>
            <div className="w-1/3">
              <Button color="white" className="capitalize" onClick={ExcelDownload}>
                Download Excel
              </Button>
            </div>
          </div>
          <DataTable
            //title="Resale"
            columns={columns}
            data={resale}
            customStyles={CustomStyles}
            onRowClicked={(e) => onRowClicked(e.id)}
            pagination
            paginationServer
            fixedHeader
            fixedHeaderScrollHeight="450px"
            selectableRowsHighlight
            highlightOnHover
            pointerOnHover
            paginationComponentOptions={CustomPagination}
            onChangePage={onPageClick}
            paginationTotalRows={totalRows}
            paginationDefaultPage={selectedPage}
            // actions={
            //   <Button color="white" className="capitalize" onClick={ExcelDownload}>
            //     Download Excel
            //   </Button>
            // }
          />
          <button
            type="button"
            className="bg-[#00A0B6] text-white px-5 py-1.5 rounded block"
            style={{ marginTop: resale.length ? -40 : 0, marginLeft: 90 }}
            onClick={goToSelectedPage}
          >
            Go to Page
          </button>
        </div>
        <div className="flex" style={{ marginTop: resale.length ? -55 : 0, marginLeft: 45 }}>
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

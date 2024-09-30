/* eslint-disable @typescript-eslint/no-explicit-any */
//import { Button } from '@material-tailwind/react'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import DataTable, { TableColumn } from 'react-data-table-component'

import getExchangeRateList from '@/api/exchange-rate'
//import { DownloadSaleExcel } from '@/api/resale-detail'
import InputText from '@/components/common/input-text'
import SearchBoxDate from '@/components/common/searchbox-date'
import LoaderContext from '@/context/loader-context'
import { ExchangeRate } from '@/interface'

export default function ExchangeRatelist() {
  const [exchangerate, setExchangeRate] = useState<Array<ExchangeRate>>([])

  const { showLoader, hideLoader } = useContext(LoaderContext)
  const navigate = useRouter()

  //const [search, setSearch] = useState<Date | null>(null)
  const [search, setSearch] = useState<Date | undefined>(() => undefined)
  const [totalPages, setTotalPage] = useState<number>(1)
  const [totalRows, setTotalRows] = useState<number>(1)
  const [selectedPage, setSelectedPage] = useState<number>(1)

  const onSelectedPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputPage = parseInt(event.target.value, 10)
    const selectedPageIndex = inputPage - 1
    if (selectedPageIndex >= 0 && selectedPageIndex < totalPages) {
      setSelectedPage(isNaN(inputPage) ? 1 : inputPage)
    }
  }

  const goToSelectedPage = () => {
    const selectedPageIndex = selectedPage - 1
    if (selectedPageIndex >= 0 && selectedPageIndex < totalPages) {
      onPageClick(selectedPageIndex)
    }
  }

  const changeHandler = (date: Date | null) => {
    setSearch(date !== null ? date : undefined)
  }

  const SearchClick = () => {
    setSelectedPage(1)
    const fieldValue = search ? search.toISOString() : ''
    getlistdata(fieldValue, 1)
  }

  const onPageClick = (newPageNumber: number) => {
    setSelectedPage(isNaN(newPageNumber) ? 1 : newPageNumber)
    getlistdata(search ? search.toISOString() : '', newPageNumber)
  }

  const getlistdata = async (fieldValue?: string, pageNo?: number) => {
    try {
      showLoader()
      const result = await getExchangeRateList(fieldValue, pageNo)
      setExchangeRate(result.data.data ?? [])
      setTotalPage(result.data.total_page)
      setTotalRows(result.data.total_row)
      hideLoader()
    } catch (error) {
      hideLoader()
      console.log(error)
    }
  }

  const onRowClicked = (id: number) => navigate.push(`/admin/exchange-rate/${id}`)

  const columns: TableColumn<any>[] = [
    {
      name: 'Sr. No.',
      cell: (row: any, index: number) => index + 1,
      sortable: true,
      width: '90px',
    },
    {
      name: 'Date',
      selector: (row) => dayjs(row.edate).format('DD MMM,YYYY') || '',
      sortable: true,
    },
    {
      name: 'Rate',
      selector: (row) => row.erate,
      sortable: true,
    },
    {
      name: 'USD $',
      //selector: (row) => row.isactive,
      sortable: true,
    },
    {
      name: 'Status Request',
      cell: (row) => (
        <div
          className={`w-full text-white font-bold py-2 px-4 rounded text-center
          
        ${row.isactive === true ? 'bg-green' : ''}`}
          onClick={() => onRowClicked(row.id)}
        >
          {row.isactive === true ? 'Active' : ''}
        </div>
      ),
      selector: (row) => row.isactive,
      sortable: true,
      reorder: true,
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

  const CustomPagination = {
    rowsPerPageText: ' ',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'All',
  }

  // const ExcelDownload = async () => {
  //   try {
  //     showLoader()
  //     const result = await DownloadSaleExcel()
  //     const href = window.URL.createObjectURL(new Blob([result.data]))

  //     const anchorElement = document.createElement('a')

  //     anchorElement.href = href
  //     anchorElement.download = `Exchange_Rate_${new Date()}.xlsx`

  //     document.body.appendChild(anchorElement)
  //     anchorElement.click()

  //     document.body.removeChild(anchorElement)
  //     window.URL.revokeObjectURL(href)

  //     hideLoader()
  //   } catch (error) {
  //     hideLoader()
  //     console.log(error)
  //   }
  // }

  const addProductClickHandler = () => navigate.push('/admin/exchange-rate/new')

  return (
    <div className="flex-1 w-full pt-5" style={{ height: '500px' }}>
      <div className="bg-white">
        <div className="px-5 pt-5">
          <span className="font-Montserrat  font-normal text-black text-2xl">Exchange Rate</span>
        </div>
        <div className="p-5">
          <div className="w-full flex justify-end py-5">
            <div className="w-full pr-5" style={{ zIndex: 1000 }}>
              <SearchBoxDate value={search} onChange={changeHandler} onSearchClick={SearchClick} />
            </div>
            <div className="w-1/3">
              {/* <Button color="white" className="capitalize" onClick={ExcelDownload}>
                Download Excel
              </Button> */}
            </div>
          </div>
          <DataTable
            columns={columns}
            data={exchangerate}
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
          />
          {/* <button
            type="button"
            className="bg-black text-white px-5 py-1.5 rounded block"
            style={{ marginTop: exchangerate.length ? -40 : 0, marginLeft: 220 }}
            onClick={addProductClickHandler}
          >
            Add Rate<span className="ml-2">+</span>
          </button>
          <button
            type="button"
            className="bg-[#00A0B6] text-white px-5 py-1.5 rounded block"
            style={{ marginTop: exchangerate.length ? -40 : 0, marginLeft: 90 }}
            onClick={goToSelectedPage}
          >
            Go to Page
          </button> */}
          <div className="flex items-center" style={{ marginTop: exchangerate.length ? -40 : 0 }}>
            <button type="button" className="bg-[#00A0B6] text-white px-5 py-1.5 rounded mr-3" onClick={goToSelectedPage} style={{ marginLeft: 90 }}>
              Go to Page
            </button>
            <button type="button" className="bg-black text-white px-5 py-1.5 rounded" onClick={addProductClickHandler}>
              Add Rate<span className="ml-2">+</span>
            </button>
          </div>
        </div>
        <div className="flex" style={{ marginTop: exchangerate.length ? -55 : 0, marginLeft: 45 }}>
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

import { Button } from '@material-tailwind/react'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import DataTable, { TableColumn } from 'react-data-table-component'

import { DownloadExcel, DownloadFile } from '@/api'
import getInsuranceListWithFilter from '@/api/insurance'
import { Dropdown } from '@/components/common'
import InputText from '@/components/common/input-text'
import SearchBox from '@/components/common/searchbox'
import DownloadIcon from '@/components/icons/download-icon'
import LoaderContext from '@/context/loader-context'
import { INSURANCE_DOWNLOAD_OPTIONS, INSURANCE_SEARCH_LIST } from '@/enums'
import { Insurance } from '@/interface'

export default function Insurancelist() {
  const [policy, setPolicy] = useState<Array<Insurance>>([])
  const [Dropvalue, setDropvalue] = useState<string>(INSURANCE_DOWNLOAD_OPTIONS.IN_PROCESS)
  const { showLoader, hideLoader } = useContext(LoaderContext)
  const navigate = useRouter()

  /** Searching */

  const [SearchDropvalue, setSearchDropvalue] = useState<string>(INSURANCE_SEARCH_LIST.UID)

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
      setSearchDropvalue(INSURANCE_SEARCH_LIST.UID)
      return SearchDropvalue
    }
    setSearchDropvalue(Object.values(INSURANCE_SEARCH_LIST)[idx || 0])
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
      const result = await getInsuranceListWithFilter(fieldName, fieldValue, pageNo)
      setPolicy(result.data.data ?? [])
      setTotalPage(result.data.total_page)
      setTotalRows(result.data.total_row)
      hideLoader()
    } catch (error) {
      hideLoader()
      console.log(error)
    }
  }

  // const getlistdata = async () => {
  //   try {
  //     showLoader()
  //     const result = await getInsuranceList()
  //     setPolicy(result.data.data)
  //     hideLoader()
  //   } catch (error) {
  //     hideLoader()
  //     console.log(error)
  //   }
  // }

  // eslint-disable-next-line react-hooks/exhaustive-deps

  const onRowClicked = (id: number) => {
    navigate.push(`/admin/insurance-detail/${id}`)
  }

  const changeProductStatus = (elem?: React.ReactNode, idx?: number) => {
    //console.log(idx)
    if (idx === -1) {
      setDropvalue(INSURANCE_DOWNLOAD_OPTIONS.IN_PROCESS)
      return Dropvalue
    }
    setDropvalue(Object.values(INSURANCE_DOWNLOAD_OPTIONS)[idx || 0])
    //console.log(newVal)
    return Dropvalue
  }

  const ExcelDownload = async (status: string, id: number) => {
    try {
      showLoader()
      const result = await DownloadExcel(status, id)
      const href = window.URL.createObjectURL(new Blob([result.data]))

      //const filename = result.headers['content-disposition']
      //console.log(filename)
      // .split(';')
      // .find((n: string) => n.includes('filename='))
      // .replace('filename=', '')
      // .trim()

      const anchorElement = document.createElement('a')

      anchorElement.href = href
      anchorElement.download = `Insurance_${new Date()}.xlsx`

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
    console.log(Dropvalue)
    ExcelDownload(Dropvalue, 0)
  }

  const iconClick = async (filename: string) => {
    if (filename !== '') {
      try {
        showLoader()
        const result = await DownloadFile(filename)

        const href = window.URL.createObjectURL(new Blob([result.data]))
        const anchorElement = document.createElement('a')

        anchorElement.href = href
        anchorElement.download = filename

        document.body.appendChild(anchorElement)
        anchorElement.click()

        document.body.removeChild(anchorElement)
        window.URL.revokeObjectURL(href)

        hideLoader()
      } catch (error) {
        hideLoader()
        console.log(error)
      }
    } else {
      alert('Document not available to Download')
    }
    //console.log(filename)
  }

  const columns: TableColumn<Insurance>[] = [
    {
      name: 'Sr. No.',
      cell: (row, index: number) => index + 1,
      reorder: true,
      width: '70px',
    },
    {
      name: 'UID',
      selector: (row) => row.uid || '',
      sortable: true,
      reorder: true,
    },
    {
      name: 'Status Request',
      cell: (row) => (
        <div
          className={`w-full text-white font-bold py-2 px-4 rounded text-center
        ${row.polstatus === 'Cancelled' || row.polstatus === 'Expired' ? 'bg-red-400 ' : 'bg-light-muted-azure'}`}
          onClick={() => onRowClicked(row.id)}
        >
          {row.polstatus}
        </div>
      ),
      selector: (row) => row.polstatus,
      sortable: true,
      reorder: true,
      width: '140px',
    },
    {
      name: 'Request No.',
      selector: (row) => row.requestno || '',
      sortable: true,
      reorder: true,
    },
    {
      name: 'Date of Request',
      selector: (row) => (row.createdat !== null ? dayjs(row.createdat).format('DD MMM,YYYY') : ''),
      sortable: true,
      reorder: true,
    },
    {
      name: 'Date of Renewal',
      selector: (row) => (row.polend !== null ? dayjs(row.polend).format('DD MMM,YYYY') : ''),
      sortable: true,
      reorder: true,
    },
    {
      name: 'Name',
      selector: (row) => row.phname,
      sortable: true,
      reorder: true,
    },
    {
      name: 'Policy Download',
      cell: (row) => (
        // <button className="btn primary" onClick={() => console.log(row.id)}>
        //   Download
        // </button>
        // <div onClick={() => ExcelDownload('', row.id)} className="w-full p-2 justify-center items-center">
        //   <DownloadIcon  />
        // </div>

        <div
          onClick={() => {
            if (row.poldoc) iconClick(row.poldoc)
          }}
          className="w-full p-2 justify-center items-center"
        >
          {/* <DownloadIcon strokeColor={row.poldoc ? '#00FF00' : '#161616'} /> */}
          <DownloadIcon strokeColor="#161616" />
        </div>
      ),
      width: '100px',
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

  return (
    <div className="flex-1 w-full pt-5" style={{ height: '500px' }}>
      <div className="bg-white ">
        <div className=" px-5 pt-5">
          <span className="font-Montserrat  font-normal text-black text-2xl">Insurance</span>
        </div>
        <div className="p-5">
          <div className="w-full flex justify-end">
            <div className="w-full pr-5">
              <SearchBox
                options={Object.values(INSURANCE_SEARCH_LIST)}
                selected={changeStatus}
                value={search}
                onChange={changeHandler}
                onSearchClick={SearchClick}
              />
            </div>
            <div className="w-auto">
              <Dropdown
                options={Object.values(INSURANCE_DOWNLOAD_OPTIONS)}
                selected={changeProductStatus}
                disabled={false}
                //onChange={changeProductStatus}
                className="w-52"
              />
            </div>
            <div className="w-1/3">
              <Button color="white" className="capitalize" onClick={DownloadClick}>
                Download Excel
              </Button>
            </div>
          </div>

          <DataTable
            //title="Insurance"
            columns={columns}
            data={policy}
            customStyles={CustomStyles}
            onRowClicked={(e) => onRowClicked(e.id || 0)}
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
          <button
            type="button"
            className="bg-[#00A0B6] text-white px-5 py-1.5 rounded block"
            style={{ marginTop: policy.length ? -40 : 0, marginLeft: 90 }}
            onClick={goToSelectedPage}
          >
            Go to Page
          </button>
        </div>
        <div className="flex" style={{ marginTop: policy.length ? -55 : 0, marginLeft: 45 }}>
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

// const rootElement = document.getElementById("root");
// ReactDOM.render(<Insurancelist />, rootElement);
//style={{ marginTop: policy.length ? -325 : 0, marginLeft: 580 }}

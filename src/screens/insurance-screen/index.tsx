import { Button } from '@material-tailwind/react'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import DataTable, { TableColumn } from 'react-data-table-component'

import getInsuranceList from '@/api/insurance'
import { Dropdown } from '@/components/common'
import DownloadIcon from '@/components/icons/download-icon'
import LoaderContext from '@/context/loader-context'
import { INSURANCE_DOWNLOAD_OPTIONS } from '@/enums'
import { Insurance } from '@/interface'

export default function Insurancelist() {
  const [policy, setPolicy] = useState<Array<Insurance>>([])
  const [Dropvalue, setDropvalue] = useState<string>()
  const { showLoader, hideLoader } = useContext(LoaderContext)

  const navigate = useRouter()

  // eslint-disable-next-line react-hooks/exhaustive-deps

  const onRowClicked = (id: number) => {
    navigate.push(`/admin/insurance-detail/${id}`)
  }

  const changeProductStatus = (elem?: React.ReactNode, idx?: number) => {
    //console.log(idx)
    setDropvalue(Object.values(INSURANCE_DOWNLOAD_OPTIONS)[idx || 0])
    //console.log(newVal)
    return Dropvalue
  }

  const rowDownload = (id: number) => {
    console.log(id)
  }

  const DownloadClick = () => {
    console.log(Dropvalue)
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
      name: 'Download',
      cell: (row) => (
        // <button className="btn primary" onClick={() => console.log(row.id)}>
        //   Download
        // </button>
        <div onClick={() => rowDownload(row.id)} className="w-full p-2 justify-center items-center">
          <DownloadIcon />
        </div>
      ),
      width: '100px',
    },
  ]

  useEffect(() => {
    const getlistdata = async () => {
      try {
        showLoader()
        const result = await getInsuranceList()
        setPolicy(result.data.data)
        hideLoader()
      } catch (error) {
        hideLoader()
        console.log(error)
      }
    }
    getlistdata()
  }, [showLoader, hideLoader])

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
      <div className="bg-white  ">
        <div className="p-5">
          <div className="w-full flex justify-end">
            <div className="w-52">
              <Dropdown
                options={Object.values(INSURANCE_DOWNLOAD_OPTIONS)}
                //value={INSURANCE_DOWNLOAD_OPTIONS.ACTIVE}
                selected={changeProductStatus}
                disabled={false}
                onChange={changeProductStatus}
                className="w-52"
              />
            </div>
            <div>
              <Button color="white" className="capitalize" onClick={DownloadClick}>
                Download Excel
              </Button>
            </div>
          </div>
          <DataTable
            title="Insurance"
            columns={columns}
            data={policy}
            customStyles={CustomStyles}
            onRowClicked={(e) => onRowClicked(e.id || 0)}
            pagination
            fixedHeader
            fixedHeaderScrollHeight="450px"
            selectableRowsHighlight
            highlightOnHover
            pointerOnHover
            paginationComponentOptions={CustomPagination}
            // actions={
            //   <>
            //     <Button color="white" className="capitalize" onClick={DownloadClick}>
            //       Download Excel
            //     </Button>
            //   </>
            // }
          />
        </div>
      </div>
    </div>
  )
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<Insurancelist />, rootElement);
//style={{ marginTop: policy.length ? -325 : 0, marginLeft: 580 }}

import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import DataTable, { TableColumn } from 'react-data-table-component'

import getInsuranceList from '@/api/insurance'
import { Insurance } from '@/interface'

export default function Insurancelist() {
  const [policy, setPolicy] = useState<Array<Insurance>>([])

  const navigate = useRouter()

  const getlistdata = async () => {
    try {
      const result = await getInsuranceList()
      setPolicy(result.data.data)
      // setfilteredPolicy(result.data.data);
    } catch (error) {
      console.log(error)
    }
  }

  const onRowClicked = (id: number) => {
    //console.log(id);
    navigate.push(`/admin/insurance-detail/${id}`)
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
      selector: (row) => row.id || '',
      sortable: true,
      reorder: true,
    },
    {
      name: 'Status Request',
      cell: (row) => (
        //<Link href={`/admin/insurance-detail/${row.id}`}>
        <button className={`text-white font-bold py-2 px-4 rounded ${row.polstatus ? 'bg-light-muted-azure ' : 'bg-red-400 '}`}>
          {row.polstatus ? 'Open' : 'Close'}
        </button>
        //</Link>
      ),
      selector: (row) => row.polstatus,
      sortable: true,
      reorder: true,
    },
    {
      name: 'Request No.',
      selector: (row) => row.requestno || '',
      sortable: true,
      reorder: true,
    },
    {
      name: 'Date of Request',
      selector: (row) => (row.polstart !== null ? dayjs(row.polstart).format('DD MMM,YYYY') : ''),
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
        <button className="btn primary" onClick={() => alert(row.id)}>
          Download
        </button>
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
      <div className="bg-white  ">
        <div className="p-5">
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
            actions={
              <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Download Excel</button>
            }
          />
        </div>
      </div>
    </div>
  )
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<Insurancelist />, rootElement);

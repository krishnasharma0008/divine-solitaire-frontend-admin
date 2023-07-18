/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@material-tailwind/react'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import DataTable, { TableColumn } from 'react-data-table-component'

import getResaleList from '@/api/resale'
import LoaderContext from '@/context/loader-context'
import { Resale } from '@/interface'

export default function Resalelist() {
  const [resale, setResale] = useState<Array<Resale>>([])

  const { showLoader, hideLoader } = useContext(LoaderContext)
  const navigate = useRouter()

  const getlistdata = async () => {
    showLoader()
    try {
      const result = await getResaleList()
      setResale(result.data.data)
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
              : row.rstatus === 'Close'
              ? 'bg-red-400'
              : row.rstatus === 'InReview'
              ? 'bg-orange-300	'
              : 'bg-green	'
          }`}
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
      selector: (row) => dayjs(row.invdate).format('DD MMM,YYYY') || '',
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
  }, [getlistdata])

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
            title="Resale"
            columns={columns}
            data={resale}
            customStyles={CustomStyles}
            onRowClicked={(e) => onRowClicked(e.id)}
            pagination
            fixedHeader
            fixedHeaderScrollHeight="450px"
            selectableRowsHighlight
            highlightOnHover
            pointerOnHover
            paginationComponentOptions={CustomPagination}
            actions={
              <Button color="white" className="capitalize">
                Download Excel
              </Button>
            }
          />
        </div>
      </div>
    </div>
  )
}

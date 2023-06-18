/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@material-tailwind/react'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import DataTable, { TableColumn } from 'react-data-table-component'

import getResaleList from '@/api/resale'
import { Resale } from '@/interface'

export default function Resalelist() {
  const [resale, setResale] = useState<Array<Resale>>([])

  const navigate = useRouter()

  const getlistdata = async () => {
    try {
      const result = await getResaleList()
      setResale(result.data.data)
      // setfilteredPolicy(result.data.data);
    } catch (error) {
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
    },
    {
      name: 'UID',
      selector: (row) => row.uid,
    },
    {
      name: 'Status Request',
      cell: (row) => (
        // <a href={`/admin/resale-detail/${row.id}`}>
        <Button color="gray">{row.polstatus ? 'Open' : 'Close'}</Button>
        // </a>
      ),
      selector: (row) => row.polstatus || '',
      sortable: true,
    },
    {
      name: 'Request No.',
      selector: (row) => row.requestno || '',
    },
    {
      name: 'Request Type',
      selector: (row) => row.etype || '',
    },
    {
      name: 'Date of Request',
      selector: (row) => dayjs(row.invdate).format('DD MMM,YYYY') || '',
    },
    {
      name: 'Name',
      selector: (row) => row.phname || '',
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

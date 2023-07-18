/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@material-tailwind/react'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import DataTable, { TableColumn } from 'react-data-table-component'

import getStoreLocatorList from '@/api/store-locator'
import LoaderContext from '@/context/loader-context'
import { StoreLocator } from '@/interface'

const columns: TableColumn<StoreLocator>[] = [
  {
    name: 'Sr. No.',
    cell: (row: any, index: number) => index + 1,
    sortable: true,
    width: '90px',
  },
  {
    name: 'Name',
    selector: (row) => row.name || '',
    sortable: true,
  },
  {
    name: 'State',
    selector: (row) => row.state || '',
    sortable: true,
    width: '180px',
  },
  {
    name: 'City',
    selector: (row) => row.city || '',
    sortable: true,
    width: '140px',
  },
]

const StoreLocatorList: React.FC = () => {
  const [storelocator, setStoreLocator] = useState<Array<StoreLocator>>([])
  const { showLoader, hideLoader } = useContext(LoaderContext)

  const navigate = useRouter()

  // eslint-disable-next-line react-hooks/exhaustive-deps

  const onRowClicked = (id: number) => navigate.push(`/admin/storelocator/${id}`)

  useEffect(() => {
    const getlistdata = async () => {
      showLoader()
      try {
        const result = await getStoreLocatorList()
        console.log(result.data.data)
        setStoreLocator(result.data.data)
        //console.log(result.data.data)
        hideLoader()
      } catch (error) {
        hideLoader()
        console.log(error)
      }
    }
    getlistdata()
  }, [hideLoader, showLoader])

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
    rowsPerPageText: '', //`<button type="submit" onClick={onSubmitHandler} className="rounded-md bg-Chinese-Black-sidebar py-2 text-sm font-semibold text-white shadow-sm hover:bg-Chinese-Black-sidebar focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 px-12" >Add</button>`,
    selectAllRowsItem: true,
    selectAllRowsItemText: 'All',
  }

  return (
    <div className="flex-1 w-full pt-5" style={{ height: '500px' }}>
      <div className="bg-white">
        <div className="p-5">
          <DataTable
            title="Store Locator"
            columns={columns}
            data={storelocator}
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

export default StoreLocatorList

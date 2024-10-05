/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@material-tailwind/react'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import DataTable, { TableColumn } from 'react-data-table-component'

import getSpecialProductsList from '@/api/special-products'
import LoaderContext from '@/context/loader-context'
import { SpecialProducts } from '@/interface'

const SpecialProductsList: React.FC = () => {
  const [resale, setSpecialProducts] = useState<Array<SpecialProducts>>([])
  const { showLoader, hideLoader } = useContext(LoaderContext)

  const navigate = useRouter()

  // eslint-disable-next-line react-hooks/exhaustive-deps

  const onRowClicked = (id: number) => navigate.push(`/admin/special-products/${id}`)

  const columns: TableColumn<SpecialProducts>[] = [
    {
      name: 'Sr. No.',
      cell: (row: any, index: number) => index + 1,
      sortable: true,
    },
    {
      name: 'Design No.',
      selector: (row) => row.design_no,
      sortable: true,
    },
    {
      name: 'Status',
      cell: (row) => (
        <div className={`w-24 text-white font-bold py-2 px-4 rounded ${row.isactive ? 'bg-green' : 'bg-Inactive '}`} onClick={() => onRowClicked(row.id)}>
          {row.isactive ? 'Active' : 'Inactive'}
        </div>
      ),
      selector: (row) => row.isactive || '',
      sortable: true,
    },
    {
      name: 'Product description',
      selector: (row) => row.design_type || '',
    },
    {
      name: 'Retail Price IN',
      selector: (row) => row.price || 0.0,
      sortable: true,
    },
    {
      name: 'Solitaire Details',
      selector: (row) => row.solitaire_details || '',
    },
    {
      name: 'Mount Details',
      selector: (row) => row.mount_details || '',
    },
  ]

  useEffect(() => {
    const getlistdata = async () => {
      try {
        showLoader()
        const result = await getSpecialProductsList()
        setSpecialProducts(result.data.data)
        hideLoader()
      } catch (error) {
        hideLoader()
        console.log(error)
      }
    }

    getlistdata()
  }, [hideLoader, showLoader])

  const addProductClickHandler = () => navigate.push('/admin/special-products/new')

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
            title="Special Products"
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
          <button
            type="button"
            className="bg-black text-white px-10 py-3 rounded block"
            style={{ marginTop: resale.length ? -40 : 0 }}
            onClick={addProductClickHandler}
          >
            Add Product<span className="ml-2">+</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default SpecialProductsList

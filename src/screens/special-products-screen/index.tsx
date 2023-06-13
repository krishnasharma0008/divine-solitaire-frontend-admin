/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";

import getSpecialProductsList from "@/api/special-products";
import { SpecialProducts } from "@/interface";
import { useRouter } from "next/router";

const columns: TableColumn<SpecialProducts>[] = [
  {
    name: "Sr. No.",
    cell: (row: any, index: number) => index + 1,
    sortable: true,
  },
  {
    name: "Design No.",
    selector: (row) => row.design_no,
  },
  {
    name: "Status",
    cell: (row) => (
      <button
        className={`text-white font-bold py-2 px-4 rounded ${
          row.isactive ? "bg-green" : "bg-Inactive "
        }`}
      >
        {row.isactive ? "Active" : "Inactive"}
      </button>
    ),
    selector: (row) => row.isactive || "",
    sortable: true,
  },
  {
    name: "Product description",
    selector: (row) => row.design_type || "",
  },
  {
    name: "Retail Price",
    selector: (row) => row.price || 0.0,
  },
  {
    name: "Solitaire Details",
    selector: (row) => row.solitaire_details || "",
  },
  {
    name: "Mount Details",
    selector: (row) => row.mount_details || "",
  },
];

const SpecialProductsList: React.FC = () => {
  const [resale, setSpecialProducts] = useState<Array<SpecialProducts>>([]);

  const navigate = useRouter();

  const getlistdata = async () => {
    try {
      const result = await getSpecialProductsList();
      setSpecialProducts(result.data.data);
      //console.log(result.data.data)
    } catch (error) {
      console.log(error);
    }
  };

  const onRowClicked = (id: number) =>
    navigate.push(`/admin/special-products/${id}`);

  useEffect(() => {
    getlistdata();
  }, []);

  const addProductClickHandler = () =>
    navigate.push("/admin/special-products/new");

  const CustomStyles = {
    headRow: {
      style: {
        backgroundColor: "#00A0B6",
        color: "white",
      },
    },
  };

  /* Custom Pagination*/
  const CustomPagination = {
    rowsPerPageText: "", //`<button type="submit" onClick={onSubmitHandler} className="rounded-md bg-Chinese-Black-sidebar py-2 text-sm font-semibold text-white shadow-sm hover:bg-Chinese-Black-sidebar focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 px-12" >Add</button>`,
    selectAllRowsItem: true,
    selectAllRowsItemText: "All",
  };

  return (
    <div className="flex-1 w-full pt-5" style={{ height: "500px" }}>
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
              <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                Download Excel
              </button>
            }
          />
          <button
            type="button"
            className="bg-black text-white px-10 py-3 rounded block"
            style={{ marginTop: -40 }}
            onClick={addProductClickHandler}
          >
            Add Product<span className="ml-2">+</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpecialProductsList;

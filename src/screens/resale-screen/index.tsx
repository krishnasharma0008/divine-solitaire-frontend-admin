/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";

import getResaleList from "@/api/resale";
import { Resale } from "@/interface";
import { useRouter } from "next/router";
import dayjs from "dayjs";

export default function Resalelist() {
  const [resale, setResale] = useState<Array<Resale>>([]);

  const navigate = useRouter();

  const getlistdata = async () => {
    try {
      const result = await getResaleList();
      setResale(result.data.data);
      // setfilteredPolicy(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onRowClicked = (id: number) => {
    //console.log(id);
    navigate.push(`/admin/resale-detail/${id}`);
  };

  const columns: TableColumn<any>[] = [
    {
      name: "Sr. No.",
      cell: (row: any, index: number) => index + 1,
      sortable: true,
    },
    {
      name: "UID",
      selector: (row) => row.uid,
    },
    {
      name: "Status Request",
      cell: (row) => (
        // <a href={`/admin/resale-detail/${row.id}`}>
        <button className={`text-white font-bold py-2 px-4 rounded ${row.polstatus ? "bg-light-muted-azure " : "bg-red-400 "}`}>
          {row.polstatus ? "Open" : "Close"}
        </button>
        // </a>
      ),
      selector: (row) => row.polstatus || "",
      sortable: true,
    },
    {
      name: "Request No.",
      selector: (row) => row.requestno || "",
    },
    {
      name: "Request Type",
      selector: (row) => row.etype || "",
    },
    {
      name: "Date of Request",
      selector: (row) => dayjs(row.invdate).format("DD MMM,YYYY") || "",
    },
    {
      name: "Name",
      selector: (row) => row.phname || "",
    },
  ];

  useEffect(() => {
    getlistdata();
  }, []);

  const CustomStyles = {
    headRow: {
      style: {
        backgroundColor: "#00A0B6",
      },
    },
  };

    /* Custom Pagination*/  
    const CustomPagination = {
      rowsPerPageText : ' ', 
      selectAllRowsItem: true, 
      selectAllRowsItemText: 'All' 
    }

  return (
    <div className="flex-1 w-full pt-5" style={{ height: "500px" }}>
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
              <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                Download Excel
              </button>
            }
          />
        </div>
      </div>
    </div>
  );
}

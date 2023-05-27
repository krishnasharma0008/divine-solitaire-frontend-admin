import React, { useEffect, useState } from "react";
import DataTable, {
  TableColumn,
  TableStyles,
} from "react-data-table-component";

import getUserList from "@/api/user";
import { User } from "@/interface";
import { useRouter } from "next/router";

export default function User() {
  const [user, setUser] = useState<Array<User>>([]);

  const { push } = useRouter();

  const getlistdata = async () => {
    try {
      const result = await getUserList();
      setUser(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onRowClicked = (id: number) => push(`/admin/user-detail/${id}`);

  const columns: Array<TableColumn<User>> = [
    {
      name: "Sr. No.",
      cell: (row, index: number) => index + 1,
      sortable: true,
    },
    {
      name: "Source",
      selector: (row) => row.vsource,
    },
    {
      name: "Name",
      //cell: (row: { fname : any; id: number }) => ( <a href={`/resale-detail/${row.id}`}></a> ),
      selector: (row) =>
        (row.fname === null ? " " : row.fname) +
        " " +
        (row.lname === null ? " " : row.lname),
      sortable: true,
    },
    {
      name: "Mobile No.",
      selector: (row) => row.contactno,
    },
    {
      name: "E-mail",
      selector: (row) => row.email,
    },
  ];

  useEffect(() => {
    getlistdata();
  }, []);

  const CustomStyles: TableStyles = {
    headRow: {
      style: {
        backgroundColor: "#00A0B6",
        color: "white",
      },
    },
  };

  /* Custom Pagination*/

  const CustomPagination = {
    rowsPerPageText: " ",
    selectAllRowsItem: true,
    selectAllRowsItemText: "All",
  };

  return (
    <div className="flex-1 w-full pt-5" style={{ height: "500px" }}>
      <div className="bg-white  ">
        <div className="p-5">
          <DataTable
            title="Users"
            columns={columns}
            data={user}
            customStyles={CustomStyles}
            onRowClicked={(e) => onRowClicked(e.id)}
            pagination
            //paginationComponentOptions={rowsPerPageText: 'Rows per page:'}
            fixedHeader
            fixedHeaderScrollHeight="450px"
            selectableRowsHighlight
            highlightOnHover
            pointerOnHover
            paginationComponentOptions={CustomPagination}
          />
        </div>
      </div>
    </div>
  );
}

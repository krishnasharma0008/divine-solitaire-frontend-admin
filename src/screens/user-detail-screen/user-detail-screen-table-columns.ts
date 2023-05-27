import { Portfolio, Wishlist } from "@/interface";
import { formatByCurrency } from "@/util";
import { TableColumn } from "react-data-table-component";

export const portfolioColumns: Array<TableColumn<Portfolio>> = [
  {
    name: "Sr. No.",
    cell: (row, index: number) => index + 1,
  },
  {
    name: "UID",
    selector: (row) => row.uid,
  },
  {
    name: "Design No.",
    selector: (row) => row.design_no,
    sortable: true,
  },
  {
    name: "Product Name",
    selector: (row) => row.product_type,
  },
  {
    name: "Jeweller’s Name",
    selector: () => "",
  },
  {
    name: "Current Value",
    selector: (row) => formatByCurrency(row.current_price),
  },
];

export const wishlistColumns: Array<TableColumn<Wishlist>> = [
  {
    name: "Sr. No.",
    cell: (row, index: number) => index + 1,
  },
  {
    name: "UID",
    selector: (row) => row.uid,
  },
  {
    name: "Design No.",
    selector: (row) => row.design_no,
    sortable: true,
  },
  {
    name: "Product Name",
    selector: (row) => row.product_type,
  },
  {
    name: "Collection",
    selector: (row) => row.jewelcat,
  },
  {
    name: "Current Value",
    selector: (row) => formatByCurrency(row.current_price),
  },
];

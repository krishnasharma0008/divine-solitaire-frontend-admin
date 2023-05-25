import React from "react";
import DashboardMetaData from "./sub-components/dashboard-meta-data";

const dataObj: Array<{
  title: string;
  items: Array<{ title: string; content: string }>;
}> = [
  {
    title: "Users",
    items: [
      {
        title: "New Users",
        content: "215",
      },
      {
        title: "Last 7 days user",
        content: "264",
      },
      {
        title: "1 Month active users",
        content: "123",
      },
      {
        title: "1 year active users",
        content: "96",
      },
      {
        title: "Users growth",
        content: "15.00%",
      },
    ],
  },
  {
    title: "Secondary Sale",
    items: [
      {
        title: "Open UID Requests",
        content: "215",
      },
    ],
  },
  {
    title: "Insurance",
    items: [
      {
        title: "Active Insurance",
        content: "215",
      },
      {
        title: "Fresh Insurance Request Open",
        content: "264",
      },
      {
        title: "Renewal Insurance Request Open",
        content: "123",
      },
      {
        title: "Renewal Request",
        content: "96",
      },
    ],
  },
  {
    title: "Resale",
    items: [
      {
        title: "Fresh buyback requests",
        content: "215",
      },
      {
        title: "Fresh upgrade requests",
        content: "23",
      },
    ],
  },
  {
    title: "Loan Requests",
    items: [
      {
        title: "Fresh loan requests",
        content: "235",
      },
      {
        title: "Fresh upgrade requests",
        content: "23",
      },
    ],
  },
  {
    title: "Store Locator",
    items: [
      {
        title: "Active Stores",
        content: "5",
      },
    ],
  },
  {
    title: "Solitaire Coin",
    items: [
      {
        title: "Active Products",
        content: "45",
      },
    ],
  },
];

const DashboardScreen = () => (
  <div className="font-body bg-white w-full min-h-screen p-6 flex flex-col gap-9 rounded">
    {dataObj.map(({ items, title }) => (
      <DashboardMetaData items={items} title={title} key={title} />
    ))}
  </div>
);

export default DashboardScreen;

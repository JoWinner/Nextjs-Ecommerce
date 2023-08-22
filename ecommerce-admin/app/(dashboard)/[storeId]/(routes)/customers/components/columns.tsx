"use client";

import { ColumnDef } from "@tanstack/react-table";

export type CustomerColumn = {
  id: string;
  userName: string;
  // phone: string;
  // address: string;
  email: string;
  createdAt: string;
};

export const columns: ColumnDef<CustomerColumn>[] = [
  {
    accessorKey: "userName",
    header: "Name",
  },
  // {
  //   accessorKey: "phone",
  //   header: "Phone",
  // },
  {
    accessorKey: "email",
    header: "Email",
  },
  // {
  //   accessorKey: "address",
  //   header: "Address",
  // },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
];

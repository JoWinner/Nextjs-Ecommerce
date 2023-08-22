"use client";

import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { columns, CustomerColumn } from "./columns";

interface CustomerClientProps {
  data: CustomerColumn[];
}

export const CustomerClient: React.FC<CustomerClientProps> = ({ data }) => {
  return (
    <>
      <Heading
        title={`Customers (${data.length})`}
        description="Manage customers for your store"
      />
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};

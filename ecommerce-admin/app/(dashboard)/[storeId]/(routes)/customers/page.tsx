import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { CustomerColumn } from "./components/columns";
import { CustomerClient } from "./components/client";

const CustomersPage = async ({ params }: { params: { storeId: string } }) => {
  const customers = await prismadb.customer.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCustomers: CustomerColumn[] = customers.map((item) => ({
    id: item.id,
    userName: item.userName,
    // phone: item.phone,
    // address: item.address,
    email:item.email,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CustomerClient data={formattedCustomers} />
      </div>
    </div>
  );
};

export default CustomersPage;

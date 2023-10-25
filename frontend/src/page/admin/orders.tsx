import React from "react";
import OrdersList from "../../component/adminComponent/ordersList";

const Orders = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Car Booking Orders</h1>
      <OrdersList />
    </div>
  );
};

export default Orders;

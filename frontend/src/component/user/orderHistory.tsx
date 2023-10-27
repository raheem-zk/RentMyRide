import React, { useState, useEffect } from "react";
import OrderCard from "./orderCard";
import { useSelector } from "react-redux";
import { getuserOrders } from "../../api/userApi";

const OrderHistory = () => {
  const { user } = useSelector((state: any) => state?.userAuth);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrder();
    const data = [{
      orderNumber: '12345',
      orderDate: '2023-10-26',
      carDetails: '2023 Honda Civic, Blue',
      status: 'Completed',
      totalPrice: 5000,
      pickupDate: '2023-10-30',
    },{
      orderNumber: '12345',
      orderDate: '2023-10-26',
      carDetails: '2023 Honda Civic, Blue',
      status: 'Completed',
      totalPrice: 5000,
      pickupDate: '2023-10-30',
    },{
      orderNumber: '12345',
      orderDate: '2023-10-26',
      carDetails: '2023 Honda Civic, Blue',
      status: 'Completed',
      totalPrice: 5000,
      pickupDate: '2023-10-30',
    },{
      orderNumber: '12345',
      orderDate: '2023-10-26',
      carDetails: '2023 Honda Civic, Blue',
      status: 'Completed',
      totalPrice: 5000,
      pickupDate: '2023-10-30',
    },]
    setOrders(data);
  }, []);

  const getOrder = async () => {
    const data = await getuserOrders(user._id);
  };
  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <h1 className="text-3xl font-extrabold mb-4">Order History</h1>

      {orders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {orders.map((order) => (
            <OrderCard key={order?._id} order={order} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No orders found in your history.</p>
      )}
    </div>
  );
};

export default OrderHistory;
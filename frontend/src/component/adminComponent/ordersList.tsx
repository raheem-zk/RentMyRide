import React, { useEffect, useState } from "react";
import { getOrders } from "../../api/adminApi";
import { MdOutlineReadMore } from "react-icons/md";
import { useDispatch } from "react-redux";
import { addOrders } from "../../redux/admin/ordersSlice";
import { Link } from "react-router-dom";

const OrdersList = () => {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data = await getOrders();
    dispatch(addOrders(data));
    setOrders(data);
  };

  return !orders ? (
    "orders not found"
  ) : (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse w-full">
        <thead>
          <tr>
            <th className="text-left py-3 px-4 bg-gray-200 font-semibold text-gray-700">
              Order ID
            </th>
            <th className="text-left py-3 px-4 bg-gray-200 font-semibold text-gray-700">
              Car Name
            </th>
            <th className="text-left py-3 px-4 bg-gray-200 font-semibold text-gray-700">
              User Name
            </th>
            <th className="text-left py-3 px-4 bg-gray-200 font-semibold text-gray-700">
              Pickup Date
            </th>
            <th className="text-left py-3 px-4 bg-gray-200 font-semibold text-gray-700">
              Dropoff Date
            </th>
            <th className="text-left py-3 px-4 bg-gray-200 font-semibold text-gray-700">
              Total Price
            </th>
            <th className="text-left py-3 px-4 bg-gray-200 font-semibold text-gray-700">
              Status
            </th>
            <th className="text-left py-3 px-4 bg-gray-200 font-semibold text-gray-700">
              action
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="border-t-2 border-gray-200 px-4 py-2">
                {order?.orderId}
              </td>
              <td className="border-t-2 border-gray-200 px-4 py-2">
                {order?.carId?.carName}
              </td>
              <td className="border-t-2 border-gray-200 px-4 py-2">
                {order?.userId?.firstName} {order?.userId?.lastName}
              </td>
              <td className="border-t-2 border-gray-200 px-4 py-2">
                {order?.pickupDate
                  ? new Date(order.pickupDate).toLocaleDateString()
                  : ""}
              </td>
              <td className="border-t-2 border-gray-200 px-4 py-2">
                {order?.dropoffDate
                  ? new Date(order.dropoffDate).toLocaleDateString()
                  : ""}
              </td>
              <td className="border-t-2 border-gray-200 px-4 py-2">
                {order?.totalPrice}
              </td>
              <td className="border-t-2 border-gray-200 px-4 py-2 text-green-500 font-semibold">
                {order?.status}
              </td>
              <td className="border-t-2 border-gray-200 px-4 py-2">
                <Link to={`/admin/orders/${order?._id}/more-details`}>
                  <MdOutlineReadMore size={25} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersList;
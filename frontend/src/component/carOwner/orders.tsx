import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import ActionDropdown from "./orderActionDropdown";
import { carOwnerAxios } from "../../axios/axios";
import { ordersModel } from "../../models/models";
import { MdReadMore } from "react-icons/md";

const CarOrderList = () => {
  const [orders, setOrders] = useState<ordersModel[]>([]);
  const [load, setLoad] = useState(false);

  const reload = () => {
    setLoad(!load);
  };

  const data = [
    {
      _id: 1,
      name: "John Doe",
      email: "john.doe@gmail.com",
      phone: "1234567890",
      pickupLocation: "Location A",
      dropoffLocation: "Location B",
      pickupDate: "2022-02-15",
      pickupTime: "10:00 AM",
      dropoffDate: "2022-02-15",
      dropoffTime: "12:00 PM",
      license: "12345",
      status: "approved",
    },
    {
      _id: 2,
      name: "Jane Doe",
      email: "jane.doe@gmail.com",
      phone: "0987654321",
      pickupLocation: "Location C",
      dropoffLocation: "Location D",
      pickupDate: "2022-02-20",
      pickupTime: "1:00 PM",
      dropoffDate: "2022-02-20",
      dropoffTime: "3:00 PM",
      license: "54321",
      status: "pending",
    },
  ];

  useEffect(() => {
    getOrders();
    setOrders(data);
  }, [load]);

  const getOrders = async () => {
    const response = await carOwnerAxios.get("/orders");
    // setOrders(response.data.ordersData);
  };

  return !orders ? (
    "loading..."
  ) : (
    <div className="m-3">
      <Table variant="simple" className="border border-gray-300 shadow">
  <Thead>
    <Tr>
      <Th className="border border-gray-300 p-3 text-gray-800">NO</Th>
      <Th className="border border-gray-300 p-3 text-gray-800">Customer Name</Th>
      <Th className="border border-gray-300 p-3 text-gray-800">Email</Th>
      <Th className="border border-gray-300 p-3 text-gray-800">Phone</Th>
      {window.innerWidth > 768 && (
        <>
          <Th className="border border-gray-300 p-3 text-gray-800">Pickup Location</Th>
          <Th className="border border-gray-300 p-3 text-gray-800">Dropoff Location</Th>
        </>
      )}
      <Th className="border border-gray-300 p-3 text-gray-800">Pickup Date</Th>
      <Th className="border border-gray-300 p-3 text-gray-800">Dropoff Date</Th>
      <Th className="border border-gray-300 p-3 text-gray-800">Status</Th>
      <Th className="border border-gray-300 p-3 text-gray-800">Action</Th>
    </Tr>
  </Thead>
  <Tbody>
    {orders.map((order) => (
      <Tr key={order._id}>
        <Td className="border border-gray-300 p-3">{order._id}</Td>
        <Td className="border border-gray-300 p-3">{order.name}</Td>
        <Td className="border border-gray-300 p-3">{order.email}</Td>
        <Td className="border border-gray-300 p-3">{order.phone}</Td>
        {window.innerWidth > 768 && (
          <>
            <Td className="border border-gray-300 p-3">{order.pickupLocation}</Td>
            <Td className="border border-gray-300 p-3">{order.dropoffLocation}</Td>
          </>
        )}
        <Td className="border border-gray-300 p-3">{order.pickupDate}</Td>
        <Td className="border border-gray-300 p-3">{order.dropoffDate}</Td>
        <Td className="border border-gray-300 p-3">
          {order.status === "approved" ? (
            <AiOutlineCheck className="text-green-500" />
          ) : (
            <AiOutlineClose className="text-red-500" />
          )}
        </Td>
        <Td className="border border-gray-300 p-3">
          <div className="flex items-center space-x-4">
            <ActionDropdown orderId={order?._id} reload={reload} />
            <button
              type="button"
              className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-indigo-500"
            >
              <MdReadMore size={20} />
            </button>
          </div>
        </Td>
      </Tr>
    ))}
  </Tbody>
</Table>

    </div>
  );
};

export default CarOrderList;

import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import ActionDropdown from "./orderActionDropdown";
import { ordersModel } from "../../models/models";
import { MdReadMore } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersList } from "../../api/carOwnerApi";
import { addOwnerOrders } from "../../redux/carOwner/ordersSlice";
import { Link } from "react-router-dom";
import Pagination from "../pagination";

const CarOrderList = () => {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState<ordersModel[]>([]);
  const [load, setLoad] = useState(false);
  const { carOwner } = useSelector((state: any) => state.carOwnerAuth);
  const [size, setSize] = useState(1);
  const [page, setPage] = useState(1);

  const reload = () => {
    setLoad(!load);
  };

  useEffect(() => {
    getOrders();
  }, [load, page]);

  const getOrders = async () => {
    const { ordersData, size } = await getOrdersList(carOwner._id, page);
    setSize(size);
    dispatch(addOwnerOrders(ordersData));
    setOrders(ordersData);
  };

  const filterPagination = (pageNumber) => {
    setPage(pageNumber);
  };

  return !orders ? (
    "loading..."
  ) : (
    <div className="m-3">
      <Table variant="simple" className="border border-gray-300 shadow">
        <Thead>
          <Tr>
            <Th className="border border-gray-300 p-3 text-gray-800">NO</Th>
            <Th className="border border-gray-300 p-3 text-gray-800">
              Customer Name
            </Th>
            <Th className="border border-gray-300 p-3 text-gray-800">Email</Th>
            <Th className="border border-gray-300 p-3 text-gray-800">Phone</Th>
            {window.innerWidth > 768 && (
              <>
                <Th className="border border-gray-300 p-3 text-gray-800">
                  Pickup Location
                </Th>
                <Th className="border border-gray-300 p-3 text-gray-800">
                  Dropoff Location
                </Th>
              </>
            )}
            <Th className="border border-gray-300 p-3 text-gray-800">
              Pickup Date
            </Th>
            <Th className="border border-gray-300 p-3 text-gray-800">
              Dropoff Date
            </Th>
            <Th className="border border-gray-300 p-3 text-gray-800">Status</Th>
            <Th className="border border-gray-300 p-3 text-gray-800">Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders.map((order, index) => (
            <Tr key={order._id}>
              <Td className="border border-gray-300 p-3">{index + 1}</Td>
              <Td className="border border-gray-300 p-3">{order.name}</Td>
              <Td className="border border-gray-300 p-3">{order.email}</Td>
              <Td className="border border-gray-300 p-3">{order.phone}</Td>
              {window.innerWidth > 768 && (
                <>
                  <Td className="border border-gray-300 p-3">
                    {order.pickupLocation}
                  </Td>
                  <Td className="border border-gray-300 p-3">
                    {order.dropoffLocation}
                  </Td>
                </>
              )}
              <Td className="border border-gray-300 p-3">
                {new Date(order?.pickupDate).toLocaleDateString()}
              </Td>
              <Td className="border border-gray-300 p-3">
                {new Date(order?.dropoffDate).toLocaleDateString()}
              </Td>
              <Td className="border border-gray-300 p-3">
                {order.status === "approved" ? (
                  <AiOutlineCheck className="text-green-500" />
                ) : (
                  <AiOutlineClose className="text-red-500" />
                )}
              </Td>
              <Td className="border border-gray-300 p-3">
                <div className="flex items-center space-x-4">
                  {order.status !== "approved" && (
                    <ActionDropdown orderId={order?._id} reload={reload} />
                  )}
                  <button
                    type="button"
                    className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <Link to={`/car-owner/orders/${order?._id}/more-details`}>
                      <MdReadMore size={20} />
                    </Link>
                  </button>
                </div>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Pagination
        size={size}
        filterPagination={filterPagination}
        currentPage={page}
      />
    </div>
  );
};

export default CarOrderList;

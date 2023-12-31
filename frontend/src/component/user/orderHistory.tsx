import React, { useState, useEffect } from "react";
import OrderCard from "./orderCard";
import { useSelector } from "react-redux";
import { getuserOrders } from "../../api/userApi";
import { FcFilledFilter } from "react-icons/fc";
import Pagination from "../pagination";
import ZeroDataComponent from "../zeroData";

const OrderHistory = () => {
  const { user } = useSelector((state: any) => state?.userAuth);
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState(false);
  const [size, setSize] = useState(1);
  const [page, setPage] = useState(1);
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    getOrder();
  }, [page, filterValue]);

  const getOrder = async () => {
    const { ordersData, size } = await getuserOrders(
      user._id,
      page,
      filterValue
    );
    setSize(size);
    setOrders(ordersData);
  };

  const handleClick = () => {
    setFilter(!filter);
  };

  const filterPagination = async (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <div className=" justify-between flex">
        <h1 className="text-3xl font-extrabold mb-4">Order History</h1>
        <div className="relative right-0">
          <div className="flex items-center">
            <button
              className="mr-2 px-1 py-2 text-gray-700"
              onClick={handleClick}
            >
              Filter
            </button>
            <FcFilledFilter
              onClick={handleClick}
              className="h-5 w-5 text-gray-700 cursor-pointer"
            />
          </div>
          {filter && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-md py-1">
              <button
                onClick={() => setFilterValue("finished")}
                className="w-full text-left px-3 py-2 block hover:bg-gray-100"
              >
                Finished
              </button>
              <button
                onClick={() => setFilterValue("pending")}
                className="w-full text-left px-3 py-2 block hover:bg-gray-100"
              >
                Pending
              </button>
              <button
                onClick={() => setFilterValue("rented")}
                className="w-full text-left px-3 py-2 block hover:bg-gray-100"
              >
                Rented
              </button>
              <button
                onClick={() => setFilterValue("rejected")}
                className="w-full text-left px-3 py-2 block hover:bg-gray-100"
              >
                Rejected
              </button>
            </div>
          )}
        </div>
      </div>
      {orders.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {orders.map((order) => (
              <OrderCard key={order?._id} order={order} />
            ))}
          </div>
          <Pagination
            currentPage={page}
            size={size}
            filterPagination={filterPagination}
          />
        </>
      ) : (
        <ZeroDataComponent />
      )}
    </div>
  );
};

export default OrderHistory;

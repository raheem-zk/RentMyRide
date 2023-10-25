import React, { useEffect, useState } from "react";
import AdminOrderDetail from "../../component/adminComponent/orderMoreDetails";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const OrderMoreDetails = () => {
  const { orderId } = useParams();
  const [data, setData] = useState([]);
  const { orders } = useSelector((state: any) => state.ordersList);
  useEffect(() => {
    const data = orders.find((order) => order?._id === orderId);
    setData(data);
  }, []);
  return <AdminOrderDetail order={data} />;
};

export default OrderMoreDetails;

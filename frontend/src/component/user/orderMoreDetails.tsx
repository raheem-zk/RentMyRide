import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSpesificOrderDetails, orderCancelAPI } from "../../api/userApi";
import Loading from "../loading";
import Modal from "react-modal";
import { ErrorMessage, successMessage } from "../../utils/utils";
import { useSelector } from "react-redux";

const OrderMoreDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [modal, setModal] = useState(false);
  const { user } = useSelector((state: any) => state.userAuth);
  const [cancellationReason, setCancellationReason] = useState("");

  const getOrderData = async () => {
    const data = await getSpesificOrderDetails(orderId);
    setOrder(data);
  };

  useEffect(() => {
    getOrderData();
  }, []);

  const cancellationModal = () => {
    setModal(!modal);
  };

  const handleCancel = async () => {
    if (cancellationReason.length < 0) {
      ErrorMessage("Please enter the cancel reason");
    }
    try {
      await orderCancelAPI(orderId, user._id, cancellationReason);
      getOrderData()
      setModal(false)
      successMessage(
        "Order cancellation request has been successfully generated."
      );
    } catch (error) {}
  };

  return !order ? (
    <Loading />
  ) : (
    <div>
      <Modal
        isOpen={modal}
        onRequestClose={cancellationModal}
        contentLabel="Order Cancellation Modal"
        className="flex-col justify-center items-center bg-white p-5"
      >
        <h2 className="text-2xl font-semibold mb-4 mt-40">
          Confirm Order Cancellation
        </h2>
        <p className="mb-4">
          Are you sure you want to cancel this order? This action cannot be
          undone.
        </p>
        <textarea
          rows="4"
          placeholder="Cancellation Reason"
          className="w-full p-2 mb-4 border rounded"
          required
          value={cancellationReason}
          onChange={(e) => setCancellationReason(e.target.value)}
        />
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleCancel}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Confirm
          </button>
          <button
            onClick={cancellationModal}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </Modal>
      <h1 className="text-3xl font-semibold text-center mb-4 text-indigo-600">
        Order Details
      </h1>
      <div>
        <div className="bg-white shadow-lg p-6 rounded-lg mx-auto m-4 shadow-yellow-300">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex justify-center items-center">
              <img
                src={order?.carId?.images[0]}
                alt="Car"
                className="w-full rounded-lg object-cover h-80"
              />
            </div>

            <div className="flex-col justify-center my-5">
              <p className="text-lg mb-2">
                Car Name:{" "}
                <span className="font-semibold">{order?.carId?.carName}</span>
              </p>
              <p className="text-lg mb-2">
                Car Description:{" "}
                <span className="font-semibold">
                  {order?.carId?.description}
                </span>
              </p>
              <p className="text-lg mb-2">
                Pickup Location:{" "}
                <span className="font-semibold">{order?.pickupLocation}</span>
              </p>
              <p className="text-lg mb-2">
                Pickup Date:{" "}
                <span className="font-semibold">
                  {new Date(order?.pickupDate).toLocaleDateString()}
                </span>
              </p>
              <p className="text-lg mb-2">
                Pickup Time:{" "}
                <span className="font-semibold">{order?.pickupTime}</span>
              </p>
              <p className="text-lg mb-2">
                Order Status:{" "}
                <span className="font-semibold">{order?.status}</span>
              </p>
              {order?.status === "approved" ? (
                <button
                  onClick={cancellationModal}
                  className="bg-red-500 text-white px-4 py-2 rounded-md inline-block"
                >
                  Cancel Order
                </button>
              ) : (
                ""
              )}
            </div>
            <div className="flex-col justify-center my-5">
              <p>Dropoff Location: {order?.dropoffLocation}</p>
              <p>
                Dropoff Date:{" "}
                {new Date(order?.dropoffDate).toLocaleDateString()}
              </p>
              <p>Dropoff Time: {order?.dropoffTime}</p>
              <p>
                User Name: {order?.userId?.firstName} {order?.userId?.lastName}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mx-5 my-5">
        <h1 className="text-2xl font-semibold mb-4">Order Details</h1>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm">
              Order ID: <span className="font-semibold">{order.orderId}</span>
            </p>
            <p className="text-sm">
              Payment Method:{" "}
              <span className="font-semibold">{order.paymentMethod}</span>
            </p>
            <p className="text-sm">
              Pickup Date:{" "}
              <span className="font-semibold">{order.pickupDate}</span>
            </p>
            <p className="text-sm">
              Dropoff Date:{" "}
              <span className="font-semibold">{order.dropoffDate}</span>
            </p>
            <p className="text-sm">
              Pickup Time:{" "}
              <span className="font-semibold">{order.pickupTime}</span>
            </p>
            <p className="text-sm">
              Dropoff Time:{" "}
              <span className="font-semibold">{order.dropoffTime}</span>
            </p>
          </div>
          <div>
            <p className="text-sm">
              Payment Method:{" "}
              <span className="font-semibold">{order.paymentMethod}</span>
            </p>
            <p className="text-sm">
              Phone Number: <span className="font-semibold">{order.phone}</span>
            </p>
            <p className="text-sm">
              Pickup Location:{" "}
              <span className="font-semibold">{order.pickupLocation}</span>
            </p>
            <p className="text-sm">
              Dropoff Location:{" "}
              <span className="font-semibold">{order.dropoffLocation}</span>
            </p>
            <p className="text-sm">
              Email: <span className="font-semibold">{order.email}</span>
            </p>
            <p className="text-sm">
              License: <span className="font-semibold">{order.license}</span>
            </p>
            <p className="text-sm">
              Total Days:{" "}
              <span className="font-semibold">{order.totalDays}</span>
            </p>
            <p className="text-sm">
              Total Price:{" "}
              <span className="font-semibold">{order.totalPrice}</span>
            </p>
            <p className="text-sm">
              Per Day Price:{" "}
              <span className="font-semibold">{order.perDayPrice}</span>
            </p>
            <p className="text-sm">
              Status: <span className="font-semibold">{order.status}</span>
            </p>
            <p className="text-sm">
              Payment Status:{" "}
              <span className="font-semibold">{order.paymentStatus}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderMoreDetails;

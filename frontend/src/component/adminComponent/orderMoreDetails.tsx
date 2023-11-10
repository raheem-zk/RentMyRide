import React from "react";

const AdminOrderDetail = ({ order }) => {
  return (
    <div>
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
            {order?.cancellationReason && (
              <p className="text-sm">
                Cancellation Reason:{" "}
                <span className="font-semibold">
                  {order.cancellationReason}
                </span>
              </p>
            )}
            <p className="text-sm">
              Payment Status:{" "}
              <span className="font-semibold">{order.paymentStatus}</span>
            </p>
          </div>
        </div>
      </div>

      <div>
        <div className="bg-white shadow-lg p-6 rounded-lg mx-auto m-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex justify-center items-center">
              <img src={order?.carId?.images[0]} alt="Car" className="h-auto" />
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
                  {order?.pickupDate
                    ? new Date(order.pickupDate).toLocaleDateString()
                    : ""}
                </span>
              </p>
              <p className="text-lg mb-2">
                Order Status:{" "}
                <span className="font-semibold">{order?.status}</span>
              </p>
            </div>
            <div className="flex-col justify-center my-5">
              <p>Dropoff Location: {order?.dropoffLocation}</p>
              <p>Dropoff Date: {order?.dropoffDate}</p>
              <p>
                User Name: {order?.userId?.firstName} {order?.userId?.lastName}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="bg-white shadow-lg p-6 rounded-lg mx-auto m-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex justify-center items-center">
              <img
                src={
                  order?.userId?.profilePicture
                    ? order.userId.profilePicture
                    : "https://thumbs.dreamstime.com/b/flat-male-avatar-image-beard-hairstyle-businessman-profile-icon-vector-179285629.jpg"
                }
                alt="Car"
                className="h-auto"
              />
            </div>
            <div className="flex-col justify-center my-5">
              <p className="text-lg mb-2">
                Name:{" "}
                <span className="font-semibold">
                  {order?.userId?.firstName} {order?.userId?.lastName}
                </span>
              </p>
              <p className="text-lg mb-2">
                Email:{" "}
                <span className="font-semibold">{order?.userId?.email}</span>
              </p>
              <p className="text-lg mb-2">
                Phone Number:{" "}
                <span className="font-semibold">
                  {order?.userId?.phoneNumber}
                </span>
              </p>
              <p className="text-lg mb-2">
                Licence Number:{" "}
                <span className="font-semibold">{order?.userId?.license}</span>
              </p>
              <p className="text-lg mb-2">
                Address:{" "}
                <span className="font-semibold">{order?.userId?.address}</span>
              </p>
              <p className="text-lg mb-2">
                Age:{" "}
                <span className="font-semibold">
                  {order?.userId?.age ? order?.userId?.age : "not Updated"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetail;

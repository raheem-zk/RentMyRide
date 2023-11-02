import React from "react";

const AdminOrderDetail = ({ order }) => {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-center mb-4 text-indigo-600">
        Order Details
      </h1>
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
                <span className="font-semibold">{order?.pickupDate}</span>
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

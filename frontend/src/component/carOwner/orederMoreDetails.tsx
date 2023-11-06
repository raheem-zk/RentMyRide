import React from "react";

import Loading from "../loading";

const MoreDetails = ({ order, car, user }) => {
  return !order ? (
    <Loading />
  ) : (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h1 className="text-3xl font-semibold text-center mb-4 text-indigo-600">
        Order Details
      </h1>
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
            Total Days: <span className="font-semibold">{order.totalDays}</span>
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
          {
            order?.cancellationReason && (
              <p className="text-sm">
              Cancellation Reason: <span className="font-semibold">{order.cancellationReason}</span>
            </p>
            )
          }
          <p className="text-sm">
            Payment Status:{" "}
            <span className="font-semibold">{order.paymentStatus}</span>
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="flex justify-center items-center">
          <img
            src={
              user?.profilePicture
                ? user.profilePicture
                : "https://thumbs.dreamstime.com/b/flat-male-avatar-image-beard-hairstyle-businessman-profile-icon-vector-179285629.jpg"
            }
            alt="User"
            className="w-32 h-32 rounded-full"
          />
        </div>
        <div className="flex-col justify-center my-5">
          <p className="text-lg mb-2">
            Name:{" "}
            <span className="font-semibold">
              {user?.firstName} {user?.lastName}
            </span>
          </p>
          <p className="text-lg mb-2">
            Email: <span className="font-semibold">{user?.email}</span>
          </p>
          <p className="text-lg mb-2">
            Phone Number:{" "}
            <span className="font-semibold">{user?.phoneNumber}</span>
          </p>
          <p className="text-lg mb-2">
            License Number:{" "}
            <span className="font-semibold">{user?.license}</span>
          </p>
          <p className="text-lg mb-2">
            Address: <span className="font-semibold">{user?.address}</span>
          </p>
          <p className="text-lg mb-2">
            Age:{" "}
            <span className="font-semibold">
              {user?.age ? user?.age : "not Updated"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MoreDetails;

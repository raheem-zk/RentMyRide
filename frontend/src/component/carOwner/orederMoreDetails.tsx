import React, { useState } from "react";
import { NotUpdated } from "../../utils/adminUtils";

const MoreDetails = ({ order, car, user }) => {
  console.log(order);
  console.log(car);
  console.log(user);
  return order && (
    <div className="md:m-5 bg-white p-4 rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-center mb-4 text-indigo-600">
        Order Details
      </h1>
      <table className="w-full">
        <tr>
          <th className="bg-gray-800 text-white p-2">Car Name</th>
          <td className="p-2">{car?.carName}</td>
        </tr>
        <tr>
            <th className="bg-gray-800 text-white p-2">Car Photo</th>
            <td className="p-2">
                {car?.images ? (
                    <img
                        src={car.images[0]}
                        alt="Profile"
                        className="rounded-full w-16 h-16"
                    />
                ) : <NotUpdated />}
            </td>
        </tr>
        <tr>
          <th className="bg-gray-800 text-white p-2">Car Brand</th>
          <td className="p-2">{car?.brand}</td>
        </tr>
        <tr>
          <th className="bg-gray-800 text-white p-2">User Full Name</th>
          <td className="p-2">{user?.firstName} {user?.lastName}</td>
        </tr>
        <tr>
          <th className="bg-gray-800 text-white p-2">Pickup Date</th>
          <td className="p-2">{order?.pickupDate? new Date(order?.dropoffDate).toLocaleDateString() : ''}</td>
        </tr>
        <tr>
          <th className="bg-gray-800 text-white p-2">Dropoff Date</th>
          <td className="p-2">{order?.dropoffDate ? new Date(order?.dropoffDate).toLocaleDateString() : ''}</td>
        </tr>
        <tr>
          <th className="bg-gray-800 text-white p-2">Total Price</th>
          <td className="p-2">{order?.totalPrice }</td>
        </tr>
        <tr>
          <th className="bg-gray-800 text-white p-2">Status</th>
          <td className={`p-2 ${order?.status === "Approved" ? "text-green-500" : "text-red-500"}`}>
            {order?.status}
          </td>
        </tr>
        <tr>
          <th className="bg-gray-800 text-white p-2">Car Description</th>
          <td className="p-2">{car?.description}</td>
        </tr>
        <tr>
          <th className="bg-gray-800 text-white p-2">Car License Plate</th>
          <td className="p-2">{car?.licensePlate}</td>
        </tr>
        <tr>
          <th className="bg-gray-800 text-white p-2">User Email</th>
          <td className="p-2 text-blue-500">{user?.email}</td>
        </tr>
        {/* Add more fields as needed */}
      </table>
    </div>
  );
};

export default MoreDetails;

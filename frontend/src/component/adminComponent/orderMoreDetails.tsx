import React from "react";
import { NotUpdated } from "../../utils/adminUtils";
import { Link } from "react-router-dom";

const AdminOrderDetail = ({ order }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-center mb-4 text-indigo-600">
        Order Details
      </h1>
      <table className="w-full">
        <tr>
          <th className="bg-gray-800 text-white p-2">Order ID</th>
          <td className="p-2">{order?.orderId}</td>
        </tr>
        <tr>
          <th className="bg-gray-800 text-white p-2">Car Name</th>
          <td className="p-2">{order?.carId?.carName}</td>
        </tr>
        <tr>
          <th className="bg-gray-800 text-white p-2">Car Photo</th>
          <td className="p-2">
            {order?.carId?.images ? (
              <Link to={`/admin/cars/${order?.carId?._id}/more-details`}>
                <img
                  src={order?.carId?.images[0]}
                  alt="Profile"
                  className="rounded-full w-16 h-16"
                />
              </Link>
            ) : (
              <NotUpdated />
            )}
          </td>
        </tr>
        <tr>
          <th className="bg-gray-800 text-white p-2">User Full Name</th>
          <Link to={`/admin/users/${order?.userId?._id}/more-details`}>
            <td className="p-2">
              {order?.userId?.firstName} {order?.userId?.lastName}
            </td>
          </Link>
        </tr>
        <tr>
          <th className="bg-gray-800 text-white p-2">User Profile</th>
          <td className="p-2">
            {order?.userId?.profile ? (
              <Link to={`/admin/users/${order?.userId?._id}/more-details`}>
                <img
                  src={order?.userId?.profile}
                  alt="Profile"
                  className="rounded-full w-16 h-16"
                />
              </Link>
            ) : (
              <NotUpdated />
            )}
          </td>
        </tr>
        <tr>
          <th className="bg-gray-800 text-white p-2">Pickup Date</th>
          <td className="p-2">{order?.pickupDate}</td>
        </tr>
        <tr>
          <th className="bg-gray-800 text-white p-2">Dropoff Date</th>
          <td className="p-2">{order?.dropoffDate}</td>
        </tr>
        <tr>
          <th className="bg-gray-800 text-white p-2">Pickup Location</th>
          <td className="p-2">{order?.pickupLocation}</td>
        </tr>
        <tr>
          <th className="bg-gray-800 text-white p-2">Pickup Time</th>
          <td className="p-2">{order?.pickupTime}</td>
        </tr>
        <tr>
          <th className="bg-gray-800 text-white p-2">Dropoff Time</th>
          <td className="p-2">{order?.dropoffTime}</td>
        </tr>
        <tr>
          <th className="bg-gray-800 text-white p-2">Total Price</th>
          <td className="p-2">{order?.totalPrice}</td>
        </tr>
        <tr>
          <th className="bg-gray-800 text-white p-2">Status</th>
          <td
            className={`p-2 ${
              order?.status === "Approved" ? "text-green-500" : "text-red-500"
            }`}
          >
            {order?.status}
          </td>
        </tr>
        <tr>
          <th className="bg-gray-800 text-white p-2">Car License Plate</th>
          <td className="p-2">{order?.carId?.licensePlate}</td>
        </tr>
        <tr>
          <th className="bg-gray-800 text-white p-2">User Email</th>
          <td className="p-2 text-blue-500">{order?.userId?.email}</td>
        </tr>
        <tr>
          <th className="bg-gray-800 text-white p-2">User Phone Number</th>
          <td className="p-2 text-blue-500">{order?.userId?.phoneNumber}</td>
        </tr>
        <tr>
          <th className="bg-gray-800 text-white p-2">License</th>
          <td className="p-2 text-blue-500">{order?.userId?.license}</td>
        </tr>
        <tr>
          <th className="bg-gray-800 text-white p-2">Address</th>
          <td className="p-2 text-blue-500">{order?.userId?.address}</td>
        </tr>
      </table>
    </div>
  );
};

export default AdminOrderDetail;

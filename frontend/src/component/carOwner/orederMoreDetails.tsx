import React from "react";
import { NotUpdated } from "../../utils/adminUtils";
import { Link } from "react-router-dom";

const MoreDetails = ({ order, car, user }) => {
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
                    <Link to={`/car-owner/car-details/${car?._id}`}><img
                        src={car.images[0]}
                        alt="Profile"
                        className="rounded-full w-16 h-16"
                    />
                    </Link>
                ) : <NotUpdated />}
            </td>
        </tr>
        <tr>
          <th className="bg-gray-800 text-white p-2">Car Model</th>
          <td className="p-2">{car?.model?.name}</td>
        </tr>
        <tr>
            <th className="bg-gray-800 text-white p-2">User Profile</th>
            <td className="p-2">
                {user?.profile ? (
                    <img
                        src={user.profile}
                        alt="Profile"
                        className="rounded-full w-16 h-16"
                    />
                ) : <NotUpdated />}
            </td>
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
          <th className="bg-gray-800 text-white p-2">Pickup Location</th>
          <td className="p-2">{order?.pickupLocation }</td>
        </tr>
        <tr>
          <th className="bg-gray-800 text-white p-2">Pickup Time</th>
          <td className="p-2">{order?.pickupTime }</td>
        </tr>
        <tr>
          <th className="bg-gray-800 text-white p-2">Dropoff Time</th>
          <td className="p-2">{order?.dropoffTime }</td>
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
          <th className="bg-gray-800 text-white p-2">Car License Plate</th>
          <td className="p-2">{car?.licensePlate}</td>
        </tr>
        <tr>
          <th className="bg-gray-800 text-white p-2">User Email</th>
          <td className="p-2 text-blue-500">{user?.email}</td>
        </tr>
        <tr>
          <th className="bg-gray-800 text-white p-2">User Phone Number</th>
          <td className="p-2 text-blue-500">{user?.phoneNumber}</td>
        </tr>
        <tr>
          <th className="bg-gray-800 text-white p-2">License</th>
          <td className="p-2 text-blue-500">{user?.license}</td>
        </tr>
        <tr>
          <th className="bg-gray-800 text-white p-2">Address</th>
          <td className="p-2 text-blue-500">{user?.address}</td>
        </tr>
      </table>
    </div>
  );
};

export default MoreDetails;

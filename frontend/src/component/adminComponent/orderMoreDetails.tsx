import React from "react";
import { NotUpdated } from "../../utils/adminUtils";
import { Link } from "react-router-dom";

const AdminOrderDetail = ({ order }) => {
  console.log(order)
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
            Car Name: <span className="font-semibold">{order?.carId?.carName}</span>
          </p>
          <p className="text-lg mb-2">
            Car Description: <span className="font-semibold">{order?.carId?.description}</span>
          </p>
          <p className="text-lg mb-2">
            Pickup Location: <span className="font-semibold">{order?.pickupLocation}</span>
          </p>
          <p className="text-lg mb-2">
            Pickup Date: <span className="font-semibold">{order?.pickupDate}</span>
          </p>
          <p className="text-lg mb-2">
            Order Status: <span className="font-semibold">{order?.status}</span>
          </p>
        </div>
        <div className="flex-col justify-center my-5">
          <p>Dropoff Location: {order?.dropoffLocation}</p>
          <p>Dropoff Date: {order?.dropoffDate}</p>
          <p>User Name: {order?.userId?.firstName} {order?.userId?.lastName}</p>
        </div>
      </div>
    </div>
  </div>

  <div>
    <div className="bg-white shadow-lg p-6 rounded-lg mx-auto m-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex justify-center items-center">
          <img src={order?.userId?.profilePicture ? order.userId.profilePicture : "https://thumbs.dreamstime.com/b/flat-male-avatar-image-beard-hairstyle-businessman-profile-icon-vector-179285629.jpg"} alt="Car" className="h-auto" />
        </div>
        <div className="flex-col justify-center my-5">
          <p className="text-lg mb-2">
            Name: <span className="font-semibold">{order?.userId?.firstName} {order?.userId?.lastName}</span>
          </p>
          <p className="text-lg mb-2">
            Email: <span className="font-semibold">{order?.userId?.email}</span>
          </p>
          <p className="text-lg mb-2">
            Phone Number: <span className="font-semibold">{order?.userId?.phoneNumber}</span>
          </p>
          <p className="text-lg mb-2">
            Licence Number: <span className="font-semibold">{order?.userId?.license}</span>
          </p>
          <p className="text-lg mb-2">
            Address: <span className="font-semibold">{order?.userId?.address}</span>
          </p>
          <p className="text-lg mb-2">
            Age: <span className="font-semibold">{order?.userId?.age ? order?.userId?.age : 'not Updated'}</span>
          </p>
        </div>
        <div className="flex-col justify-center my-5">
          {/* <p>Dropoff Location: {order?.dropoffLocation}</p>
          <p>Dropoff Date: {order?.dropoffDate}</p>
          <p>User Name: {order?.userId?.firstName} {order?.userId?.lastName}</p> */}
        </div>
      </div>
    </div>
  </div>
</div>

  )
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

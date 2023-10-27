import React from 'react';

const OrderCard = ({ order }) => {
  
  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-xl font-semibold mb-2">Order #{order?.orderId}</h2>
      <div className="text-gray-600 mb-4">Order Date: {order?.orderDate ? new Date (order?.orderDate).toLocaleDateString() : ''}</div>
      
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="font-semibold text-gray-800">Car Details:</p>
          <p>{order?.carId?.year} ,{order?.carId?.carName} </p>
        </div>
        <div>
          <p className="font-semibold text-gray-800">Status:</p>
          <p className={`text-${order?.status === 'rejected' ? 'red' : (order?.status === 'pending' ? 'yellow' : 'green')}-500`}>
            {order?.status}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-gray-800">Total Price:</p>
          <p>₹{order?.totalPrice}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-800">Pickup Date:</p>
          <p>{new Date(order?.pickupDate).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
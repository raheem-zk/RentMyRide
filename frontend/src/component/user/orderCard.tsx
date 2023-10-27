import React from 'react';

const OrderCard = ({ order }) => {
  
  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-xl font-semibold mb-2">Order #{order?.orderNumber}</h2>
      <div className="text-gray-600 mb-4">Order Date: {order?.orderDate}</div>
      
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="font-semibold text-gray-800">Car Details:</p>
          <p>{order?.carDetails}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-800">Status:</p>
          <p className={`text-${order?.status === 'Completed' ? 'green' : 'red'}-500`}>
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
          <p>{order?.pickupDate}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
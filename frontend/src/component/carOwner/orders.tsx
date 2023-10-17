import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import ActionDropdown from './orderActionColumn';

const CarOrderList = () => {
  const orders = [
    {
      id: 1,
      customerName: "John Doe",
      email: "john.doe@gmail.com",
      phone: "1234567890",
      pickupLocation: "Location A",
      dropoffLocation: "Location B",
      pickupDate: "2022-02-15",
      pickupTime: "10:00 AM",
      dropoffDate: "2022-02-15",
      dropoffTime: "12:00 PM",
      license: "12345",
      status: "approved",
    },
    {
      id: 2,
      customerName: "Jane Doe",
      email: "jane.doe@gmail.com",
      phone: "0987654321",
      pickupLocation: "Location C",
      dropoffLocation: "Location D",
      pickupDate: "2022-02-20",
      pickupTime: "1:00 PM",
      dropoffDate: "2022-02-20",
      dropoffTime: "3:00 PM",
      license: "54321",
      status: "pending",
    },
    // add more orders
  ];  

  
 const handleApprove = () => {
  // Your code to handle approval here
};

const handleReject = () => {
  // Your code to handle rejection here
};

const handleViewDetails = () => {
  // Your code to handle viewing details here
};

 return (
    <div className="m-3">
      <Table variant="simple" className="border border-gray-300 shadow">
        <Thead>
          <Tr>
            <Th className="border border-gray-300 p-3 text-gray-800">NO</Th>
            <Th className="border border-gray-300 p-3 text-gray-800">Customer Name</Th>
            <Th className="border border-gray-300 p-3 text-gray-800">Email</Th>
            <Th className="border border-gray-300 p-3 text-gray-800">Phone</Th>
            <Th className="border border-gray-300 p-3 text-gray-800">Pickup Location</Th>
            <Th className="border border-gray-300 p-3 text-gray-800">Dropoff Location</Th>
            <Th className="border border-gray-300 p-3 text-gray-800">Pickup Date</Th>
            <Th className="border border-gray-300 p-3 text-gray-800">Dropoff Date</Th>
            <Th className="border border-gray-300 p-3 text-gray-800">Status</Th>
            <Th className="border border-gray-300 p-3 text-gray-800">Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders.map((order) => (
            <Tr key={order.id}>
              <Td className="border border-gray-300 p-3">{order.id}</Td>
              <Td className="border border-gray-300 p-3">{order.customerName}</Td>
              <Td className="border border-gray-300 p-3">{order.email}</Td>
              <Td className="border border-gray-300 p-3">{order.phone}</Td>
              <Td className="border border-gray-300 p-3">{order.pickupLocation}</Td>
              <Td className="border border-gray-300 p-3">{order.dropoffLocation}</Td>
              <Td className="border border-gray-300 p-3">{order.pickupDate}</Td>
              <Td className="border border-gray-300 p-3">{order.dropoffDate}</Td>
              <Td className="border border-gray-300 p-3">
                {order.status === "approved" ? (
                 <AiOutlineCheck className="text-green-500" />
                ) : (
                 <AiOutlineClose className="text-red-500" />
                )}
              </Td>
              <Td className="border border-gray-300 p-3">
              <ActionDropdown
                 onApprove={handleApprove}
                 onReject={handleReject}
                 onViewDetails={handleViewDetails}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
 );
};

export default CarOrderList;
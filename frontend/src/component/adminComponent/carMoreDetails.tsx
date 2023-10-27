import React from "react";

const CarMoreDetails = ({ car }) => {
  if (!car) {
    return (
      <div className="text-center mt-4">
        <div className="bg-red-500 text-white py-2 px-4 rounded-md inline-block opacity-0 transition-opacity duration-300 hover:opacity-100">
          Not fout
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Car Details</h1>
      <div className="bg-white rounded shadow p-4">
        <table className="w-full">
          <tr className="border-b">
            <th className="py-2">Car Name</th>
            <td className="py-2">{car?.carName}</td>
          </tr>
          <tr className="border-b">
            <th className="py-2">License Plate</th>
            <td className="py-2">{car?.licensePlate}</td>
          </tr>
          <tr className="border-b">
            <th className="py-2">Transmission</th>
            <td className="py-2">{car?.transmission?.name}</td>
          </tr>
          <tr className="border-b">
            <th className="py-2">Per Day Price</th>
            <td className="py-2">{car?.perDayPrice}</td>
          </tr>
          <tr className="border-b">
            <th className="py-2">Description</th>
            <td className="py-2">{car?.description}</td>
          </tr>
          <tr className="border-b">
            <th className="py-2">Status</th>
            <td className="py-2">{car?.status}</td>
          </tr>
          <tr className="border-b">
            <th className="py-2">Brand</th>
            <td className="py-2">{car?.brand?.name}</td>
          </tr>
          <tr className="border-b">
            <th className="py-2">Model</th>
            <td className="py-2">{car?.model?.name}</td>
          </tr>
          <tr className="border-b">
            <th className="py-2">Category</th>
            <td className="py-2">{car?.category?.name}</td>
          </tr>
          <tr className="border-b">
            <th className="py-2">Fuel Type</th>
            <td className="py-2">{car?.fuelType?.name}</td>
          </tr>
          <tr className="border-b">
            <th className="py-2">Availability</th>
            <td className="py-2">{car?.availability}</td>
          </tr>
          <tr className="border-b">
            <th className="py-2">Images</th>
            <td className="py-2 flex flex-wrap">
              {car?.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Car Image ${index + 1}`}
                  className="w-24 h-24 mx-2 my-2 rounded"
                />
              ))}
            </td>
          </tr>
          <tr className="border-b">
            <th className="py-2">Created At</th>
            <td className="py-2">
              {new Date(car?.createdAt).toLocaleDateString()}
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default CarMoreDetails;

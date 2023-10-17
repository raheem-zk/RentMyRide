import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { carOwnerAxios } from "../../axios/axios";
import { useSelector } from "react-redux";
import { FiEdit } from "react-icons/fi";
import { AiOutlineFundView } from "react-icons/ai";

const OwnerCars = () => {
  const [cars, setCars] = useState<any[]>([]);
  const { carOwner } = useSelector((state: any) => state.carOwnerAuth);
  useEffect(() => {
    getCars();
  }, []);

  const getCars = async () => {
    const ownerId: string = carOwner._id;
    const response = await carOwnerAxios.get(`/cars/${ownerId}`);
    setCars(response.data.carsData);
  };

  return !cars ? (
    "Loading..."
  ) : (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">My Cars</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cars.map((car) => (
          <div key={car?._id} className="bg-white rounded shadow p-4">
            <img src={car?.images[0]} alt="" className="w-full h-auto" />
            <h3 className="text-xl font-bold mb-2">
              {car?.brand?.name} {car?.model?.name}
            </h3>
            <p className="text-gray-600 mb-2">Year: {car?.year}</p>
            <p className="text-gray-600 mb-2">
              availability: {car?.availability}
            </p>
            <p className="text-gray-600 mb-2">
              License Plate: {car?.licensePlate}
            </p>
            <div className="flex space-x-2">
              <Link to={`/edit-car/${car?._id}`}>
                <FiEdit className="text-2xl text-green-600" />
              </Link>
              <Link to={`/car-details/${car?._id}`}>
                <AiOutlineFundView className="text-2xl text-blue-600" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OwnerCars;

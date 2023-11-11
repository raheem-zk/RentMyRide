import React, { useEffect, useState } from "react";
import { BsFuelPump } from "react-icons/bs";
import { TbManualGearbox } from "react-icons/tb";
import { Link } from "react-router-dom";
import { CarDetailsModel } from "../models/models";
import Loading from "./loading";

const CarCard = ({ data }) => {
  const [carsData, setCarData] = useState<CarDetailsModel[] | []>(data);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    setCarData(data);
    setLoad(false);
  }, [data]);

  return load ? (
    <Loading />
  ) : (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Rental Cars</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {carsData.length != 0 &&
          carsData.map((car: CarDetailsModel) => (
            <div key={car?._id} className="bg-white rounded-lg shadow-md p-4">
              <Link to={`/cars/more-details/${car?._id}`}>
                <img
                  src={car?.images[0]}
                  alt={car?.carName}
                  className="w-full sm:h-40 md:h-62 object-cover rounded-t-lg"
                />
              </Link>
              <div className="p-2">
                <h2 className="text-lg font-extrabold">{car?.carName}</h2>
                <div className="flex items-center">
                  <BsFuelPump className="text-green-500 mr-2" />
                  <span className="text-gray-600">{car?.fuelType?.name}</span>
                </div>
                <div className="flex items-center">
                  <TbManualGearbox className="text-blue-500 mr-2" />
                  <span className="text-gray-600">
                    {car?.transmission?.name}
                  </span>
                </div>
                <p className="text-black font-bold">₹{car?.perDayPrice}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CarCard;

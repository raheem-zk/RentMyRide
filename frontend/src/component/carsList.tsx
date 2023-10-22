import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { BsFuelPumpDiesel } from "react-icons/bs";
import { GiGearStickPattern } from "react-icons/gi";
import { CarDetailsModel } from "../models/models";

const CarListingPage = () => {
  const [cars, setCars] = useState<CarDetailsModel>([]);
  const [loading, setLoading] = useState(true);
  const data = useSelector((state: any) => state.carsDatas);
  useEffect(() => {
    setCars(data.cars);
    setLoading(false);
  }, []);

  return (
    <div className="flex">
      <div className="bg-green-300 w-1/5 h-screen">
        {/* Filter options */}
        Filter Options
      </div>
      <div className="w-4/5 h-full">
        <h1 className="text-3xl font-bold text-center mb-4">Available Cars</h1>

        <div className=" ">
          {cars.map((car) => (
            <div
              key={car?._id}
              className="flex m-3 shadow-md bg-white rounded-lg"
            >
              <div className="w-1/4 h-40 overflow-hidden">
                <img
                  src={car?.images[0]} // Use the car image URL
                  alt={car?.carName}
                  className="w-full h-full object-cover object-center rounded-l-lg"
                />
              </div>

              <div className="p-4">
                <p className="text-lg font-semibold mb-2">
                  {car?.brand?.name} {car?.model?.name}
                </p>

                <div className="flex">
                  <div className="mr-4">
                    <span className="text-lg">
                      <BsFuelPumpDiesel className="inline mr-2" />
                      {car?.fuelType?.name}
                    </span>
                  </div>

                  <div>
                    <span className="text-lg">
                      <GiGearStickPattern className="inline mr-2" />
                      {car?.transmission?.name}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex-end text-lg font-semibold mb-2">
                <p className="text-gray-600">
                  Price: ${car?.perDayPrice} / day
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarListingPage;

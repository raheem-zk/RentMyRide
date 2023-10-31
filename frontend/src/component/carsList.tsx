import React, { useState } from "react";
import { BsFuelPumpDiesel } from "react-icons/bs";
import { GiGearStickPattern } from "react-icons/gi";
import { CarDetailsModel } from "../models/models";
import { Link } from "react-router-dom";
import Filter from "./filter";
import NoCar from "./notCar";
import Pagination from "./pagination";

const CarListingPage = ({ data }) => {
  const [cars, setCars] = useState<CarDetailsModel[]>(data);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(1);
  const handleFilter = (data) => {
    setCars(data);
  };

  const filterPageination = (number) => {
    setPage(number);
  };

  const handleSize = (data) => {
    setSize(data);
  };
  return (
    <div className="flex p-3">
      <div className="bg-amber-400 w-1/5 h-fit py-3 rounded mb-2">
        <Filter
          filteredCars={handleFilter}
          handlePagenation={page}
          handleSize={handleSize}
        />
      </div>
      <div className="w-4/5 h-full">
        <h1 className="text-3xl font-bold text-center mb-4">Available Cars</h1>

        <div className=" ">
          {cars.length == 0 ? (
            <NoCar />
          ) : (
            cars.map((car) => (
              <div
                key={car?._id}
                className="flex m-3 shadow-md bg-white rounded-lg"
              >
                <div className="w-1/4 h-40 overflow-hidden">
                  <Link to={`/cars/more-details/${car?._id}`}>
                    <img
                      src={car?.images[0]} // Use the car image URL
                      alt={car?.carName}
                      className="w-full h-full object-cover object-center rounded-l-lg"
                    />
                  </Link>
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
            ))
          )}
          <Pagination size={size} filterPagination={filterPageination} />
        </div>
      </div>
    </div>
  );
};

export default CarListingPage;

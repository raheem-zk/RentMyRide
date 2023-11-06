import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { CarDetailsModel } from "../models/models";
import Loading from "./loading";

const CarDetailsFrame = () => {
  const { carId } = useParams();
  const { cars } = useSelector((state: any) => state.carsDatas);
  const [car, setCar] = useState<CarDetailsModel | null | any>(null);
  const [image, setImage] = useState<string | null | undefined>("");

  useEffect(() => {
    const data: CarDetailsModel = cars.find((x) => x._id === carId);
    setCar(data);
    setImage(data.images[0]);
  }, [cars, carId]);

  const ChengeImage = (img: string) => {
    setImage(img);
  };

  if (!car) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/2 pr-4">
          <div className="mb-4">
            <img
              src={image}
              alt="Car"
              className="w-full rounded-lg object-cover h-96"
            />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {car?.images.map((x, index) => (
              <img
                onClick={() => ChengeImage(x)}
                key={index}
                src={x}
                alt="Car"
                className="w-full h-full rounded-lg object-cover"
              />
            ))}
          </div>
        </div>
        <div className="lg:w-1/2 bg-white p-4 rounded-lg shadow-md">
          <h1 className="text-4xl font-bold mb-4">{car?.carName}</h1>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <span className="text-gray-500 font-semibold">Brand:</span>
              <span className="ml-2">{car?.brand?.name}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-500 font-semibold">Category:</span>
              <span className="ml-2">{car?.category?.name}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-500 font-semibold">Fuel Type:</span>
              <span className="ml-2">{car?.fuelType?.name}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-500 font-semibold">Transmission:</span>
              <span className="ml-2">{car?.transmission?.name}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-500 font-semibold">Availability:</span>
              <span className="ml-2">{car?.availability}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-500 font-semibold">Start Date:</span>
              <span className="ml-2">
                {new Date(car?.startDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-500 font-semibold">End Date:</span>
              <span className="ml-2">
                {new Date(car?.endDate).toLocaleDateString()}
              </span>
            </div>
          </div>
          <p className="text-2xl font-semibold text-black mb-4 mt-4">
            ₹{car?.perDayPrice} per day
          </p>
          <Link
            to={`/checkout/${car?._id}`}
            className="bg-blue-500 text-white px-4 py-2 rounded-md inline-block"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsFrame;

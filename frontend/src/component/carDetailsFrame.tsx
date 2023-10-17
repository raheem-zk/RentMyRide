import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CarDetailsModel } from "../models/models";
import CarRentForm from "./bookingForm";

const CarDetailsFrame = () => {
  const { carId } = useParams();
  const { cars } = useSelector((state: any) => state.carsDatas);
  const [car, setCar] = useState<CarDetailsModel | null | any>(null);
  const [image, setImage] = useState<string | null | undefined>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const data: CarDetailsModel = cars.find((x) => x._id === carId);
    setCar(data);
    setImage(data.images[0]);
    console.log(data);
  }, [cars, carId]);

  const ChengeImage = (img: string) => {
    setImage(img);
  };

  if (!car) {
    return <>Loding....</>;
  }
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/2 pr-4">
          {/* Left side: Car images */}
          <div className="mb-4">
            <img src={image} alt="Car" className="w-full rounded-lg" />
          </div>
          <div className="flex space-x-4 justify-center">
            {car?.images.map((x, index) => (
              <img
                onClick={() => ChengeImage(x)}
                key={index}
                src={x}
                alt="Car"
                className="w-16 h-16 rounded-lg"
              />
            ))}
          </div>
        </div>
        <div className="lg:w-1/2">
          <h1 className="text-3xl font-extrabold mb-2">{car?.carName}</h1>
          <div className="flex items-center mb-4">
            <span className="text-gray-500">Brand:</span>
            <span className="ml-2">{car?.brand?.name}</span>
          </div>
          <div className="flex items-center mb-4">
            <span className="text-gray-500">Category:</span>
            <span className="ml-2">{car?.category?.name}</span>
          </div>
          <div className="flex items-center mb-2">
            <span className="text-gray-500">Fuel Type:</span>
            <span className="ml-2">{car?.fuelType?.name}</span>
          </div>
          <div className="flex items-center mb-4">
            <span className="text-gray-500">Transmission:</span>
            <span className="ml-2">{car?.transmission?.name}</span>
          </div>
          <div className="flex items-center mb-4">
            <span className="text-gray-500">Availability:</span>
            <span className="ml-2">{car?.availability}</span>
          </div>
          <p className="text-lg font-semibold text-black mb-4">
            ₹{car?.perDayPrice} per day
          </p>

          {/* Book Now Button */}
          <button
            onClick={handleModal}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Book Now
          </button>

          {/* Booking Modal */}
          {isModalOpen && <CarRentForm carId={car?._id} handleModal={handleModal}/>}
        </div>
      </div>
    </div>
  );
};

export default CarDetailsFrame;

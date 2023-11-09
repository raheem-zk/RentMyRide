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
      <div>
        <div className="bg-white shadow-lg p-6 rounded-lg mx-auto m-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex justify-center items-center">
              <img
                src={
                  car?.images[0]
                    }
                alt="Car"
                className="h-auto"
              />
            </div>
            <div className="flex-col justify-center my-5">
              <p className="text-lg mb-2">
                Car Name:{" "}
                <span className="font-semibold">
                  {car?.carName}
                </span>
              </p>
              <p className="text-lg mb-2">
                Model: <span className="font-semibold">{car?.model?.name}</span>
              </p>
              <p className="text-lg mb-2">
                Brand:{" "}
                <span className="font-semibold">{car?.brand?.name}</span>
              </p>
              <p className="text-lg mb-2">
                Licence Plate Number:{" "}
                <span className="font-semibold">{car?.licensePlate}</span>
              </p>
              <p className="text-lg mb-2">
                Category: <span className="font-semibold">{car?.category?.name}</span>
              </p>
              <p className="text-lg mb-2">
              fuelType:{" "}
                <span className="font-semibold">
                  {car?.fuelType?.name}
                </span>
              </p>
            </div>
            <div className="flex-col justify-center my-5">
              <h3 className="font-semibold">Available Date</h3>
              <p>Start Date: {new Date(car?.startDate).toLocaleDateString()}</p>
              <p>End Date: {new Date(car?.endDate).toLocaleDateString()}</p>
              <p>Status : { car?.status}</p>
              <p>District : { car?.district?.name}</p>
              <p>Availabe : { car?.availability}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex m-3 p-2 overflow-auto">
        {
          car?.images.map((img)=>(
            <img
            src={img}
            alt="Car"
            className="w-screen h-48 object-cover p-2"
          />
          ))
        }
      </div>
    </div>
  );
};

export default CarMoreDetails;

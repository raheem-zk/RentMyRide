import React from "react";

const Statistics = ({ totalRevenue, totalUser, totalCar, totalCarOwner }) => {
  return (
    <div className="container mx-auto px-4 py-5">
      <div className="flex flex-wrap -mx-1 lg:-mx-4">
        <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/4">
          <div className="p-3 rounded-lg shadow-sm bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-white">₹{totalRevenue}</h1>
              <p className="text-base text-white">Total views</p>
            </div>
            <div className="mt-2"></div>
          </div>
        </div>
        <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/4">
          <div className="p-3 rounded-lg shadow-sm bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-white">{totalUser}</h1>
              <p className="text-base text-white">Total views</p>
            </div>
            <div className="mt-2"></div>
          </div>
        </div>

        <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/4">
          <div className="p-3 rounded-lg shadow-sm bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-white">{totalCar}</h1>
              <p className="text-base text-white">Total Profit</p>
            </div>
            <div className="mt-2"></div>
          </div>
        </div>

        <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/4">
          <div className="p-3 rounded-lg shadow-sm bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-white">{totalCarOwner}</h1>
              <p className="text-base text-white">Total Products</p>
            </div>
            <div className="mt-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;

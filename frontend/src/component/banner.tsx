import React from "react";
import DateBasedFilter from "./dateBasedFilter";
import { filteredData } from "../api/userApi";
//  const bannerImg = "https://static.vecteezy.com/system/resources/previews/000/192/355/large_2x/vintage-los-angeles-and-classic-candillac-free-vector.jpg"
const bannerImg =
  "https://st3.depositphotos.com/7839720/33437/i/600/depositphotos_334374890-stock-photo-couple-sitting-in-car-woman.jpg";
const Banner = ({ handleFilter }) => {
  const handleDateSearch = async (startDate, endDate, district) => {
    const { data } = await filteredData({ startDate, endDate, district });
    handleFilter(data);
  };

  return (
    <div className="relative h-72">
      <img
        className="absolute inset-0 w-full h-full object-cover"
        src={bannerImg}
        alt="bannerImage"
      />
      <div className="absolute inset-0 flex items-center justify-between bg-gray-900 bg-opacity-50 px-4 py-2">
        <div className="text-white text-2xl font-bold">
          <p>RentMYRide</p>
          <p className="text-sm font-normal">Your Ride, Your Way</p>
        </div>
        <div className="ml-auto">
          <DateBasedFilter handleDateSearch={handleDateSearch} />
        </div>
      </div>
    </div>
  );
};

export default Banner;

import React from "react";
import DateBasedFilter from "./dateBasedFilter";
import { filteredData } from "../api/userApi";
//  const bannerImg = "https://static.vecteezy.com/system/resources/previews/000/192/355/large_2x/vintage-los-angeles-and-classic-candillac-free-vector.jpg"
const bannerImg =
  "https://st3.depositphotos.com/7839720/33437/i/600/depositphotos_334374890-stock-photo-couple-sitting-in-car-woman.jpg";
const Banner = ({handleFilter}) => {
  const handleDateSearch = async (startDate, endDate, districtt) => {
    const { data } = await filteredData({startDate, endDate, districtt});
    console.log(data);
    handleFilter(data);
  };

  return (
    <div className="relative h-72">
      <img
        className="absolute inset-0 w-full h-full object-cover"
        src={bannerImg}
        alt="bannerImage"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <h1 className="text-white text-2xl font-bold text-center">
          RentMYRide
        </h1>
        <DateBasedFilter handleDateSearch={handleDateSearch} />
      </div>
    </div>
  );
};

export default Banner;

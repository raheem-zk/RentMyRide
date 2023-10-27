import React from "react";
import CarListingPage from "../../component/carsList";
import { useSelector } from "react-redux";
import CarCard from "../../component/carCard";

const CarList = () => {
  const data = useSelector((state: any) => state.carsDatas);
  return data && (
    <>
      <div className="md:block hidden">
        <CarListingPage data={data.cars} />
      </div>
      <div className="md:hidden block">
        <CarCard data={data.cars} />
      </div>
    </>
  );
};

export default CarList;

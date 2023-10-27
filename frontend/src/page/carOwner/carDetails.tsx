import React, { useEffect } from "react";
import CarMoreDetails from "../../component/adminComponent/carMoreDetails";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const CarDetails = () => {
  const { carId } = useParams();
  const { carsData } = useSelector((state: any) => state.ownerCars);
  const car = carsData.find((car) => car._id === carId);

  return <CarMoreDetails car={car} />;
};

export default CarDetails;

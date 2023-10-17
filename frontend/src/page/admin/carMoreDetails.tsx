import React, { useState, useEffect } from "react";
import MoreDetails from "../../component/adminComponent/carMoreDetails";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const CarMoreDetails = () => {
  const { carId } = useParams();
  const { cars } = useSelector((state: any) => state.carsList);
  const car = cars.find((car) => car._id === carId);

  return <MoreDetails car={car} />;
};

export default CarMoreDetails;

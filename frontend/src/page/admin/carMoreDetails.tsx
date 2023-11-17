import React, { useEffect, useLayoutEffect, useState } from "react";
import MoreDetails from "../../component/adminComponent/carMoreDetails";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../../component/loading";

const CarMoreDetails = () => {
  const navigate = useNavigate();
  const { carId } = useParams();
  const { cars } = useSelector((state: any) => state.carsList);
  const [car, setCar] = useState({});
  const [load, setLoad] = useState(true);
  console.log(cars, car)
  useEffect(() => {
    if (!cars || cars.length == 0) {
      navigate("/admin/cars");
    } else {
      setLoad(false);
      const car = cars.find((car) => car._id === carId);
      setCar(car);
    }
  }, [cars]);

  useEffect(() => {
    if (!car) {
      navigate("/admin/cars");
    }
  }, [car]);

  return load ? <Loading /> : <MoreDetails car={car} />;
};

export default CarMoreDetails;

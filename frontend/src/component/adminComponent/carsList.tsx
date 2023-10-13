import React, { useEffect, useState } from "react";
import TabelFrame from "./tabelFrame";
import { adminAxios } from "../../axios/axios";
import { useDispatch } from "react-redux";
import { addAllCars } from "../../redux/admin/carsSlice";

const Cars = () => {
  const [carsData, setCarsData] = useState([]);
  const [update, setUpdate] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    getCarDatas();
  }, [update]);

  const getCarDatas = async () => {
    try {
      const response = await adminAxios.get("/cars");
      console.log(response.data.carsData)
      dispatch(addAllCars(response.data.carsData));
      setCarsData(response.data.carsData);
      setUpdate("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleAction = async (id: string, action: string, message: string) => {
    await adminAxios.patch(`/cars/${id}/${action}/${message}`);
    setUpdate("update");
  };

  return (
    <TabelFrame
      heading={"Cars"}
      data={carsData}
      handleAction={handleAction}
      role="cars"
    />
  );
};

export default Cars;

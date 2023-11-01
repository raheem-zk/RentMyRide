import React, { useEffect, useState } from "react";
import TabelFrame from "./tabelFrame";
import { adminAxios } from "../../axios/axios";
import { useDispatch } from "react-redux";
import { addAllCars } from "../../redux/admin/carsSlice";
import { carsDataAPI } from "../../api/adminApi";

const Cars = () => {
  const [carsData, setCarsData] = useState([]);
  const [update, setUpdate] = useState("");
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(1);

  useEffect(() => {
    getCarDatas();
  }, [update, page]);

  const getCarDatas = async () => {
    const { carsData, size } = await carsDataAPI(page);

    setSize(size);
    dispatch(addAllCars(carsData));
    setCarsData(carsData);
    setUpdate("");
  };

  const handleAction = async (id: string, action: string, message: string) => {
    await adminAxios.patch(`/cars/${id}/${action}/${message}`);
    setUpdate("update");
  };

  const filterPagination = (value) => {
    setPage(value);
  };

  return (
    <TabelFrame
      heading={"Cars"}
      data={carsData}
      handleAction={handleAction}
      role="cars"
      filterPagination={filterPagination}
      currentPage={page}
      size={size}
    />
  );
};

export default Cars;

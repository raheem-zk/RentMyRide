import React, { useEffect, useState } from "react";
import TabelFrame from "./tabelFrame";
import { useDispatch } from "react-redux";
import { addAllCars } from "../../redux/admin/carsSlice";
import { carActionAPI, carsDataAPI } from "../../api/adminApi";
import Loading from "../loading";

const Cars = () => {
  const [carsData, setCarsData] = useState([]);
  const [update, setUpdate] = useState("");
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(1);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    getCarDatas();
  }, [update, page]);

  const getCarDatas = async () => {
    const { carsData, size } = await carsDataAPI(page);

    setSize(size);
    dispatch(addAllCars(carsData));
    setCarsData(carsData);
    setUpdate("");
    setLoad(false);
  };

  const handleAction = async (id: string, action: string, message: string) => {
    await carActionAPI(id, action, message);
    setUpdate("update");
  };

  const filterPagination = (value) => {
    setPage(value);
  };

  return load ? (
    <Loading />
  ) : (
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

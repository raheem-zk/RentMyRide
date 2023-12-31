import React, { useEffect, useState } from "react";
import CarCard from "./carCard";
import { getHomeCardIteams } from "../api/userApi";
import { useDispatch } from "react-redux";
import { addCarsData } from "../redux/user/carsSlice";
import Banner from "./banner";
import Loading from "./loading";

const Homepage = () => {
  const [data, setData] = useState();
  const [load, setLoad] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    getCardData();
  }, []);

  const getCardData = async () => {
    const response = await getHomeCardIteams();
    dispatch(addCarsData(response));
    setData(response);
    setLoad(false);
  };
  const filterData = (data) => {
    setData(data);
  };

  return load ? (
    <Loading />
  ) : (
    <>
      <Banner handleFilter={filterData} />
      <CarCard data={data} />
    </>
  );
};

export default Homepage;

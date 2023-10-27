import React, { useEffect, useState } from "react";
import CarCard from "./carCard";
import { CarouselCustomNavigation } from "./homeCarousel";
import { getHomeCardIteams } from "../api/userApi";
import { useDispatch } from "react-redux";
import { addCarsData } from "../redux/user/carsSlice";

function Homepage() {
  const [data, setData] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    getCardData();
  }, []);

  const getCardData = async () => {
    const response = await getHomeCardIteams();
    dispatch(addCarsData(response));
    setData(response);
  };

  return (
    data && (
      <>
        <CarCard data={data} />
      </>
    )
  );
}

export default Homepage;

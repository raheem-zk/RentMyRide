import React, { useEffect, useState } from "react";
import TabelFrame from "./tabelFrame";
import { adminAxios } from "../../axios/axios";
import { useDispatch } from "react-redux";
import { addOwners } from "../../redux/admin/carownersSlice";
import { carownersDataAPI } from "../../api/adminApi";

const OwnerList = () => {
  const [ownersData, setOwnersData] = useState([]);
  const [update, setUpdate] = useState("");
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(1);

  useEffect(() => {
    getOwnersData();
  }, [update, page]);

  const getOwnersData = async () => {
    const { carownersData, size } = await carownersDataAPI(page);
    dispatch(addOwners(carownersData));
    setOwnersData(carownersData);
    setSize(size);
    setUpdate("");
  };

  const handleAction = async (id: string, action: string, message: string) => {
    try {
      await adminAxios.patch(`/car-owners/${id}/${action}`);
      setUpdate("update");
    } catch (error) {
      console.error(error);
    }
  };

  const filterPagination = (value) => {
    setPage(value);
  };

  return (
    <TabelFrame
      heading={"Car Owners"}
      data={ownersData}
      handleAction={handleAction}
      role="car-owners"
      filterPagination={filterPagination}
      currentPage={page}
      size={size}
    />
  );
};

export default OwnerList;

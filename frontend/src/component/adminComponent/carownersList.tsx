import React, { useEffect, useState } from "react";
import TabelFrame from "./tabelFrame";
import { adminAxios } from "../../axios/axios";

const OwnerList = () => {
  const [ownersData, setOwnersData] = useState([]);
  const [update, setUpdate] = useState("");

  useEffect(() => {
    getOwnersData();
  }, [update]);

  const getOwnersData = async () => {
    const response = await adminAxios.get("/car-owners");
    setOwnersData(response.data.carownersData);
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

  return (
    <TabelFrame
      heading={"Car Owners"}
      data={ownersData}
      handleAction={handleAction}
      role="car-owners"
    />
  );
};

export default OwnerList;

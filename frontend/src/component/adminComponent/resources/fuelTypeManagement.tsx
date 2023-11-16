import React, { useEffect, useState } from "react";
import Loading from "../../loading";
import ResourcesTable from "./tableFrame";
import { successMessage } from "../../../utils/utils";
import {
  getFuelTypeDataAPI,
  updateFuelTypeAPI,
  updateFuelTypeStatusAPI,
} from "../../../api/adminApi";

const FuelTypeManagement = () => {
  const [fuelType, setFuelType] = useState([]);
  const [load, setLoad] = useState(true);
  const [reload, setReload] = useState(false);

  const getFuelTypeData = async () => {
    const data = await getFuelTypeDataAPI();
    setFuelType(data);
    setLoad(false);
  };

  const handleUpdate = async (id, value) => {
    const result = await updateFuelTypeAPI(id, value);
    if (result) {
      successMessage("Fuel-type update successful!");
      setReload(!reload);
    }
  };

  const handleBlockToggle = async (id, status) => {
    const result = await updateFuelTypeStatusAPI(id, status);
    if (result) {
      successMessage(
        `Fuel-type successfully ${status ? "blocked" : "unblocked"}!`
      );
      setReload(!reload);
    }
  };

  useEffect(() => {
    getFuelTypeData();
  }, [reload]);

  return load ? (
    <Loading />
  ) : (
    <ResourcesTable
      handleBlockToggle={handleBlockToggle}
      data={fuelType}
      title={"Fuel Type Management"}
      handleUpdate={handleUpdate}
    />
  );
};

export default FuelTypeManagement;

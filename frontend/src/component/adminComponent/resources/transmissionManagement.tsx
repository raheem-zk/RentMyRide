import React, { useEffect, useState } from "react";
import ResourcesTable from "./tableFrame";
import Loading from "../../loading";
import { successMessage } from "../../../utils/utils";
import { getTransmissionDataAPI, updateTransmissionAPI, updateTransmissionStatus } from "../../../api/adminApi";

const TransmissionManagement = () => {
  const [load, setLoad] = useState(true);
  const [reload, setReload] = useState(false);
  const [transmission, setTransmission] = useState([]);

  const getTransmissionData = async () => {
    const data = await getTransmissionDataAPI();
    setTransmission(data);
    setLoad(false);
  };
  const handleUpdate = async (id, value) => {
    const result = await updateTransmissionAPI(id, value);
    if (result) {
      successMessage("Transmission update successful!");
      setReload(!reload);
    }
  };

  const handleBlockToggle = async (id, status) => {
    const result = await updateTransmissionStatus(id, status);
    if (result) {
      successMessage(
        `Transmission successfully ${status ? "blocked" : "unblocked"}!`
      );
      setReload(!reload);
    }
  };

  useEffect(() => {
    getTransmissionData();
  }, [reload]);

  return load ? (
    <Loading />
  ) : (
    <ResourcesTable
      handleBlockToggle={handleBlockToggle}
      data={transmission}
      title={"Transmission Management"}
      handleUpdate={handleUpdate}
    />
  );
};

export default TransmissionManagement;

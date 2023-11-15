import React, { useEffect, useState } from "react";
import { successMessage } from "../../../utils/utils";
import Loading from "../../loading";
import ResourcesTable from "./tableFrame";
import { getModelDataAPI, updateModelAPI, updateModelStatusAPI } from "../../../api/adminApi";

const ModelMangement = () => {
  const [models, setModels] = useState([]);
  const [load, setLoad] = useState(true);
  const [reload, setReload] = useState(false);

  const getModelData = async () => {
    const data = await getModelDataAPI();
    setModels(data);
    setLoad(false);
  };

  const handleUpdate = async (id, value) => {
    const result = await updateModelAPI(id, value);
    if (result) {
      successMessage("Model update successful!");
      setReload(!reload);
    }
  };

  const handleBlockToggle = async (id, status) => {
    const result = await updateModelStatusAPI(id, status);
    if (result) {
      successMessage(`Mode successfully ${status ? "blocked" : "unblocked"}!`);
      setReload(!reload);
    }
  };

  useEffect(() => {
    getModelData();
  }, [reload]);

  return load ? (
    <Loading />
  ) : (
    <ResourcesTable
      handleBlockToggle={handleBlockToggle}
      data={models}
      title={"Model Management"}
      handleUpdate={handleUpdate}
    />
  );
};

export default ModelMangement;

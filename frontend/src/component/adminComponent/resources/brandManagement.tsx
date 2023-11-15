import React, { useEffect, useState } from "react";
import ResourcesTable from "./tableFrame";
import Loading from "../../loading";
import { successMessage } from "../../../utils/utils";
import { getBrandDataAPI, updateBrandAPI, updateBrandStatusAPI } from "../../../api/adminApi";

const BrandManagement = () => {
  const [brand, setBrand] = useState([]);
  const [load, setLoad] = useState(true);
  const [reload, setReload] = useState(false);

  const getBrandData = async () => {
    const data = await getBrandDataAPI();
    setBrand(data);
    setLoad(false);
  };

  const handleUpdate = async (id, value) => {
    const result = await updateBrandAPI(id, value);
    if (result) {
      successMessage("Brand update successful!");
      setReload(!reload);
    }
  };

  const handleBlockToggle = async (id, status) => {
    const result = await updateBrandStatusAPI(id, status);
    if (result) {
      successMessage(
        `Brand successfully ${status ? "blocked" : "unblocked"}!`
      );
      setReload(!reload);
    }
  };

  useEffect(() => {
    getBrandData();
  }, [reload]);

  return load ? (
    <Loading />
  ) : (
    <ResourcesTable
      handleBlockToggle={handleBlockToggle}
      data={brand}
      title={"Brand Management"}
      handleUpdate={handleUpdate}
    />
  );
};

export default BrandManagement;

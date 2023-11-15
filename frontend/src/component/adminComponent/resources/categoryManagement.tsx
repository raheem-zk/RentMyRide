import React, { useEffect, useState } from "react";
import { getCategoryDataAPI, updateCategoryAPI, updateCategoryStatusAPI } from "../../../api/adminApi";
import { successMessage } from "../../../utils/utils";
import ResourcesTable from "./tableFrame";
import Loading from "../../loading";


const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [load, setLoad] = useState(true);
  const [reload, setReload] = useState(false)

  const getCategoryData = async () => {
      const data = await getCategoryDataAPI()
      setCategories(data);
      setLoad(false);
  };

  const handleUpdate = async (id, value) => {
    const result = await updateCategoryAPI(id,value);
    if(result){
        successMessage("Category update successful!")
        setReload(!reload);
    }
  };

  const handleBlockToggle = async (id, status) => {
    const result = await updateCategoryStatusAPI(id, status);
    if(result){
        successMessage(`Category successfully ${status ? 'blocked' : 'unblocked'}!`);
        setReload(!reload);
    }
};

  useEffect(() => {
    getCategoryData();
  }, [reload]);

  return load ? (
    <Loading />
  ) : (
    <ResourcesTable
      handleBlockToggle={handleBlockToggle}
      data={categories}
      title={"Category Management"}
      handleUpdate={handleUpdate}
    />
  );
};

export default CategoryManagement;

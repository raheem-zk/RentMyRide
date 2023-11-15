import axios from "axios";
import { adminAxios } from "../axios/axios";

export const getOrders = async (page) => {
  const response = await adminAxios.get("/orders", {
    params: {
      page,
    },
  });
  return {
    data: response.data?.ordersData,
    size: response.data?.size ? response.data?.size : 1,
  };
};

export const usersData = async (page) => {
  const response = await adminAxios.get(`/users`, {
    params: {
      page,
    },
  });
  return {
    userData: response?.data?.userData,
    size: response?.data?.size ? response.data?.size : 1,
  };
};

export const carsDataAPI = async (page) => {
  const response = await adminAxios.get("/cars", {
    params: {
      page,
    },
  });
  return {
    carsData: response?.data?.carsData,
    size: response?.data?.size ? response.data?.size : 1,
  };
};

export const carownersDataAPI = async (page) => {
  const response = await adminAxios.get("/car-owners", {
    params: {
      page,
    },
  });
  return {
    carownersData: response.data?.carownersData,
    size: response.data?.size ? response.data?.size : 1,
  };
};

export const adminLoginAPI = async (email, password) => {
  const response = await adminAxios.post(`/login`, { email, password });
  localStorage.setItem("adminToken", response.data?.token);
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${response.data?.token}`;

  return response.data?.adminData;
};

export const userActionAPI = async (id, action) => {
  await adminAxios.patch(`/users/${id}/${action}`);
};

export const carActionAPI = async (id, action, message) => {
  await adminAxios.patch(`/cars/${id}/${action}/${message}`);
};

export const carOwnerActionAPI = async (id, action) => {
  await adminAxios.patch(`/car-owners/${id}/${action}`);
};

export const dashboardAPI = async () => {
  const response = await adminAxios.get("/dashboard");
  return response.data;
};

export const getCategoryDataAPI = async () => {
  try {
    const response = await adminAxios.get("/category");
    return response.data?.categoryData;
  } catch (error) {}
};

export const updateCategoryAPI = async (id, value) => {
  try {
    const response = await adminAxios.patch("/updateCategory", {
      id,
      name: value,
    });
    return response.data?.message == "success" ? true : false;
  } catch (error) {}
};

export const updateCategoryStatusAPI = async (id, status) => {
  try {
    const response = await adminAxios.patch("/updateCategoryStatus", {
      id,
      status,
    });
    return response.data?.message == "success" ? true : false;
  } catch (error) {}
};

export const getTransmissionDataAPI = async () => {
  try {
    const response = await adminAxios.get("/transmission");
    return response.data?.transmissionData;
  } catch (error) {}
};

export const updateTransmissionAPI = async (id, value) => {
  try {
    const response = await adminAxios.patch("/updateTransmission", {
      id,
      name: value,
    });
    return response.data?.message == "success" ? true : false;
  } catch (error) {}
};

export const updateTransmissionStatus = async (id, status) => {
  try {
    const response = await adminAxios.patch("/updateTransmissionStatus", {
      id,
      status,
    });
    return response.data?.message == "success" ? true : false;
  } catch (error) {}
};

export const getModelDataAPI = async () => {
  try {
    const response = await adminAxios.get("/model");
    return response.data?.modelData;
  } catch (error) {}
};

export const updateModelAPI = async (id, value) => {
  try {
    const response = await adminAxios.patch("/updateModel", {
      id,
      name: value,
    });
    return response.data?.message == "success" ? true : false;
  } catch (error) {}
};

export const updateModelStatusAPI = async (id, status) => {
  try {
    const response = await adminAxios.patch("/updateModalStatus", {
      id,
      status,
    });
    return response.data?.message == "success" ? true : false;
  } catch (error) {}
};

export const getFuelTypeDataAPI = async () => {
  try {
    const response = await adminAxios.get("/fuel-type");
    return response.data?.fuelTypeData;
  } catch (error) {}
};

export const updateFuelTypeAPI = async (id, value) => {
  try {
    const response = await adminAxios.patch("/updateFuel-type", {
      id,
      name: value,
    });
    return response.data?.message == "success" ? true : false;
  } catch (error) {}
};

export const updateFuelTypeStatusAPI = async (id, status) => {
  try {
    const response = await adminAxios.patch("/updateFuel-typeStatus", {
      id,
      status,
    });
    return response.data?.message == "success" ? true : false;
  } catch (error) {}
};

export const getDistrictDataAPI = async () => {
  try {
    const response = await adminAxios.get("/district");
    return response.data?.districtData;
  } catch (error) {}
};

export const updateDistrictAPI = async (id, value) => {
  try {
    const response = await adminAxios.patch("/updateDistrict", {
      id,
      name: value,
    });
    return response.data?.message == "success" ? true : false;
  } catch (error) {}
};

export const updateDistrictStatusAPI = async (id, status) => {
  try {
    const response = await adminAxios.patch("/updateDistrictStatus", {
      id,
      status,
    });
    return response.data?.message == "success" ? true : false;
  } catch (error) {}
};

export const getBrandDataAPI = async () => {
  try {
    const response = await adminAxios.get("/brand");
    return response.data?.brandData;
  } catch (error) {}
};

export const updateBrandAPI = async (id, value) => {
  try {
    const response = await adminAxios.patch("/updateBrand", {
      id,
      name: value,
    });
    return response.data?.message == "success" ? true : false;
  } catch (error) {}
};

export const updateBrandStatusAPI = async (id, status) => {
  try {
    const response = await adminAxios.patch("/updateBrandStatus", {
      id,
      status,
    });
    return response.data?.message == "success" ? true : false;
  } catch (error) {}
};

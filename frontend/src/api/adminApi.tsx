import { adminAxios } from "../axios/axios";

export const getOrders = async (page) => {
  const response = await adminAxios.get("/orders",{
    params:{
      page
    }
  });
  return { data: response.data.ordersData, size: response.data?.size ? response.data.size : 1 };
};

export const usersData = async (page) => {
  const response = await adminAxios.get(`/users`, {
    params: {
      page,
    },
  });
  return {
    userData: response?.data?.userData,
    size: response?.data?.size ? response.data.size : 1,
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
    size: response?.data?.size ? response.data.size : 1,
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

import axios from "axios";
import { carOwnerAxios } from "../axios/axios";
import { ErrorMessage } from "../utils/utils";

export const getOrdersList = async (ownerId,page) => {
  const response = await carOwnerAxios.get(`/orders/${ownerId}/${page}`);
  return { ordersData: response.data?.ordersData, size: response.data?.size ? response.data?.size : 1};
};

export const approveOrder = async (orderId) => {
  await carOwnerAxios.patch(`/order/approve/${orderId}`);
};

export const rejectOrder = async (orderId) => {
  await carOwnerAxios.patch(`/order/reject/${orderId}`);
};

export const uploadCarImage = async (img) => {
  const presetKey = import.meta.env.VITE_PRESETKEY;
  const cloudName = import.meta.env.VITE_CLOUD_NAME;

  const formData = new FormData();
  formData.append("file", img);
  formData.append("upload_preset", presetKey);
  formData.append("cloud_name", cloudName);

  const response = await axios.post(
    import.meta.env.VITE_CLOUDINERY_API,
    formData
  );
  console.log("test images url", response.data.url);
  if (response.status === 200) {
    return response.data.url;
  } else {
    return ErrorMessage("Failed to upload the image");
  }
};

export const uploadCar = async (carDetails) => {
  await carOwnerAxios.post("/add-car", carDetails);
};

export const uploadeEditCar = async (carId, carDetails) => {
  await carOwnerAxios.post(`/edit-car/${carId}`, carDetails);
};

export const getCarModels = async () => {
  const response = await carOwnerAxios.get("/get-car-models-and-details");
  const data = {
    brand: response.data?.brand,
    category: response.data?.category,
    model: response.data?.model,
    transmission: response.data?.transmission,
    fuelType: response.data?.fuelType,
    district: response.data?.district,
  };
  
  return data;
};

export const uploadLoginData = async (email, password)=>{
  const response = await carOwnerAxios.post(`/login`, { email, password });
  localStorage.setItem("carOwnerToken", response.data.token);
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${response.data.token}`;
  return response.data.ownerData;
}

export const getOwnerCarsAPI = async (ownerId, page)=>{
  const response = await carOwnerAxios.get(`/cars/${ownerId}`,{
    params: {
      page,
    },
  });
  return {carsData :response.data.carsData, size:response.data?.size } ;
}
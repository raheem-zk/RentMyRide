import axios from "axios";
import { carOwnerAxios, userAxios } from "../axios/axios";
import { ErrorMessage } from "../utils/utils";

export const booking = async (data) => {
  await userAxios.post("/rent-booking/confirm", data);
  return true;
};

export const makePayment = async (data) => {
  const response = await userAxios.post("/rent-booking", data);
  return response?.data?.url;
};

export const getHomeCardIteams = async () => {
  const response = await userAxios.get("/");
  return response.data.carsData;
};

export const updateProfileData = async (data, userId) => {
  const response = await userAxios.patch(`/profile/${userId}/edit`, data);
  return response.data.message == "success" ? true : false;
};

export const updatePassword = async (userId, data) => {
  const response = await userAxios.patch(
    `/profile/${userId}/edit-password`,
    data
  );
  return response.data.message == "success" ? true : false;
};

export const profileUploadCloudinery = async (img) => {
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
  if (response.status === 200) {
    return response.data.url;
  } else {
    return ErrorMessage('Failed to upload the image')
  }
};

export const updateProfileImage = async (userId, url) => {
  await userAxios.patch(`/profile/${userId}/edit/profile-photo`, { url: url });
  return true;
};

export const getFilterOptionsData = async () => {
  const response = await carOwnerAxios.get("/get-car-models-and-details");

  const data = {
    brand: response.data?.brand,
    category: response.data?.category,
    model: response.data?.model,
    transmission: response.data?.transmission,
    fuelType: response.data?.fuelType,
  };
  
  return data;
};

export const filteredData = async (data) => {
  const response = await userAxios.get("/filter", {
    params: {
      searchText: data?.searchText,
      category: data?.category,
      brand: data?.brand,
      model: data?.model,
      fuelType: data?.fuelType,
      transmission: data?.transmission,
      page:data?.page,
    },
  });
  return {data :response?.data?.filteredData, size:response?.data?.size};
};

export const getuserOrders = async (userId,page)=>{
  const response = await userAxios.get(`/orders/${userId}/${page}`);
  return response.data;
}

export const updatedUserData = async (userId)=>{
  const response = await userAxios.get(`/getupdatedData/${userId}`);
  return response.data.userData;
}
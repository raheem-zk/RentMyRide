import axios from "axios";
import { carOwnerAxios } from "../axios/axios";
import { ErrorMessage } from "../utils/utils";

export const getOrdersList = async (ownerId) => {
  return await carOwnerAxios.get(`/orders/${ownerId}`);
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

export const uploadCar = async (carDetails)=>{
  await carOwnerAxios.post("/add-car", carDetails);
}

export const uploadeEditCar = async (carId, carDetails)=>{
  await carOwnerAxios.post(`/edit-car/${carId}`, carDetails);
}
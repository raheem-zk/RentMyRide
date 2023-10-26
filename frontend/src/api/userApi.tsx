import axios from "axios";
import { carOwnerAxios, userAxios } from "../axios/axios"

export const booking = async (data)=>{
    await userAxios.post('/rent-booking/confirm',data);
    return true;
}

export const makePayment = async (data)=>{
    const response = await userAxios.post('/rent-booking', data);
    return response?.data?.url;
}

export const getHomeCardIteams = async ()=>{
    const response = await userAxios.get('/');
    return response.data.carsData
}

export const updateProfileData = async (data, userId)=>{
    const response = await userAxios.patch(`/profile/${userId}/edit`, data);
    return response.data.message=='success' ? true : false;
}

export const updatePassword = async (userId, data)=>{
    const response = await userAxios.patch(`/profile/${userId}/edit-password`,data)
    return response.data.message=='success' ? true : false;
}

export const profileUploadCloudinery = async (img)=>{ 
    const presetKey = import.meta.env.VITE_PRESETKEY;
    const cloudName = import.meta.env.VITE_CLOUD_NAME;

    const formData = new FormData();
    formData.append("file", img);
    formData.append("upload_preset", presetKey);
    formData.append("cloud_name", cloudName);

    const response = await axios.post(import.meta.env.VITE_CLOUDINERY_API,formData)
    return response.data.url;
}

export const updateProfileImage = async (userId, url)=>{
    await userAxios.patch(`/profile/${userId}/edit/profile-photo`, { url:url });
    return true;
}

export const getFilterOptionsData = async ()=>{
    const response = await carOwnerAxios.get('/add-car');
    console.log(response)
    const data = {category : response.data.category , 
                 brand: response.data.brand,
                model : response.data.model,
                fuelType: response.data.fueltype,
                transmission: response.data.transmission,}
    return data;
}

import { userAxios } from "../axios/axios"

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
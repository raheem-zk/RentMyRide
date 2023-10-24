import { userAxios } from "../axios/axios"

export const booking = async (data)=>{
    await userAxios.post('/rent-booking',data);
    return true;
}

export const makePayment = async (data)=>{
    return await userAxios.post('/test', data);
}

export const getHomeCardIteams = async ()=>{
    const response = await userAxios.get('/');
    return response.data.carsData
}
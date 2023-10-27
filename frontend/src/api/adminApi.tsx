import { adminAxios } from "../axios/axios"

export const getOrders = async ()=>{
    const response = await adminAxios.get('/orders');
    return response.data.ordersData;
}
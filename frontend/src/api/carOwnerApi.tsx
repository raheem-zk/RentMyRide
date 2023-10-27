import { carOwnerAxios } from "../axios/axios"

export const getOrdersList = async (ownerId)=>{
    return await carOwnerAxios.get(`/orders/${ownerId}`);
}

export const approveOrder = async (orderId)=>{
    await carOwnerAxios.patch(`/order/approve/${orderId}`);
}

export const rejectOrder = async (orderId)=>{
    await carOwnerAxios.patch(`/order/reject/${orderId}`);
}


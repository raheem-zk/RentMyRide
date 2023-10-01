import axiosInstance from "../axios/axios"
import { ErrorMessage } from "./utils"

export const AddBrand = (data)=>{
    try {
        axiosInstance('carOwner').post('/car-owner/add-banner',data)
        .then((res)=>{
            console.log(res.data.message);
        })
        .catch((err)=>{
            ErrorMessage(err?.data?.response?.message);
        })
    } catch (error) {
        console.log('error', error);
    }
}
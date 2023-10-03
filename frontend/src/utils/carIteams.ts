import { carOwnerAxios } from "../axios/axios"
import { ErrorMessage } from "./utils"

export const addBrand = async (data)=>{
    try {
        const response = await carOwnerAxios.post('/car-owner/add-brand', {name: data});
        if (response.data.error) {
            ErrorMessage(response.data.error);
            return false;
          }
        return true;
      } catch (error) {
        console.log('error:', error);
        ErrorMessage(error.response?.data || 'An error occurred');
        return false;
      }
}

export const addCategory = async (data)=>{
  try {
    console.log('data from the dropdown add brand:', data);
    const response = await carOwnerAxios.post('/car-owner/add-category', {name: data});
    if (response.data.error) {
        ErrorMessage(response.data.error);
        return false;
      }
    return true;
  } catch (error) {
    console.log('error:', error);
    ErrorMessage(error.response?.data || 'An error occurred');
    return false;
  }
}
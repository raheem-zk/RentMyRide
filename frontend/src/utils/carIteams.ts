import { adminAxios, carOwnerAxios } from "../axios/axios"
import { ErrorMessage } from "./utils"

const emptyErrorMessage = 'Invalid input. Please provide a valid value'
export const addBrand = async (data)=>{
    try {
      if(data.trim()==''){
        ErrorMessage(emptyErrorMessage);
        return false
      }
        const response = await carOwnerAxios.post('/add-brand', {name: data});
        return true;
      } catch (error) {
        return false;
      }
}

export const addCategory = async (data)=>{
  try {
    if(data.trim()==''){
      ErrorMessage(emptyErrorMessage);
      return false
    }
    const response = await carOwnerAxios.post('/add-category', {name: data});
    return true;
  } catch (error) {
    return false;
  }
}

export const addModel = async (data)=>{
  try {
    if(data.trim()==''){
      ErrorMessage(emptyErrorMessage);
      return false
    }
    const response = await carOwnerAxios.post('/add-model', {name: data});
    return true;
  } catch (error) {
    return false;
  }
}

export const addTransmission = async (data)=>{
  try {
    if(data.trim()==''){
      ErrorMessage(emptyErrorMessage);
      return false
    }
    const response = await carOwnerAxios.post('/add-transmission', {name: data});
    return true;
  } catch (error) {
    return false;
  }
}

export const addFueltype = async (data)=>{
  try {
    if(data.trim()==''){
      ErrorMessage(emptyErrorMessage);
      return false
    }
    const response = await carOwnerAxios.post('/add-fueltype', {name: data});
    return true;
  } catch (error) {
    return false;
  }
}
export const addDistrict = async (data)=>{
  try {
    if(data.trim()==''){
      ErrorMessage(emptyErrorMessage);
      return false
    }
    const response = await carOwnerAxios.post('/add-district', {name: data});
    return true;
  } catch (error) {
    return false;
  }
}

interface VerifiyOwnerSignupProps {
  email: string,
  phoneNumber: string,
}
export const verifiyOwnerSignup = async ({email, phoneNumber}:VerifiyOwnerSignupProps): Promise<boolean| undefined>=>{
  try {
    const response = await carOwnerAxios.post('/signup-verify', { email, phoneNumber });

    if (response.status === 200) {
      if(response){
        return true;
      }
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

export const ownerSignup = async ({ownerData, carDetails}: any)=>{
  try {
    const response = await carOwnerAxios.post('/signup', {ownerData,carDetails })
    if (response.status === 200) {
      if(response){
        return true;
      }
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

export const otpVerification = async ({otp})=>{
  try {
    const response = await carOwnerAxios.post('/otp-verification',otp)
    if (response.status === 200 || response.data.message=='success') {
      if(response){
        return true;
      }
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

export const handleAction = async (id: string, action: string, message: string) => {
  try {
    await adminAxios.patch(`/cars/${id}/${action}/${message}`);
  } catch (error) {
    console.error(error);
    throw error; // You can handle errors as needed
  }
};
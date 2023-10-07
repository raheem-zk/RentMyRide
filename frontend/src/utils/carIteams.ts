import { useSelector } from "react-redux";
import { carOwnerAxios } from "../axios/axios"
import { ErrorMessage } from "./utils"
import { useNavigate } from "react-router-dom";

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
        console.log('error:', error);
        return false;
      }
}

export const addCategory = async (data)=>{
  try {
    console.log('data from the dropdown add brand:', data);
    if(data.trim()==''){
      ErrorMessage(emptyErrorMessage);
      return false
    }
    const response = await carOwnerAxios.post('/add-category', {name: data});
    return true;
  } catch (error) {
    console.log('error:', error);
    return false;
  }
}

export const addModel = async (data)=>{
  try {
    console.log('data from the dropdown add brand:', data);
    if(data.trim()==''){
      ErrorMessage(emptyErrorMessage);
      return false
    }
    const response = await carOwnerAxios.post('/add-model', {name: data});
    return true;
  } catch (error) {
    console.log('error:', error);
    return false;
  }
}

export const addTransmission = async (data)=>{
  try {
    console.log('data from the dropdown add brand:', data);
    if(data.trim()==''){
      ErrorMessage(emptyErrorMessage);
      return false
    }
    const response = await carOwnerAxios.post('/add-transmission', {name: data});
    return true;
  } catch (error) {
    console.log('error:', error);
    return false;
  }
}

export const addFueltype = async (data)=>{
  try {
    console.log('data from the dropdown add brand:', data);
    if(data.trim()==''){
      ErrorMessage(emptyErrorMessage);
      return false
    }
    const response = await carOwnerAxios.post('/add-fueltype', {name: data});
    return true;
  } catch (error) {
    console.log('error:', error);
    return false;
  }
}

interface VerifiyOwnerSignupProps {
  email: string,
  phoneNumber: string,
}
export const verifiyOwnerSignup = async ({email, phoneNumber}:VerifiyOwnerSignupProps): Promise<boolean| undefined>=>{
  console.log( email, phoneNumber,'verifyOwnerSignup side' );
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
  console.log(ownerData, carDetails);
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
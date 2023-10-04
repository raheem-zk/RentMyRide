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

export const sendCarDetails = async ()=>{
   const { carOwnerSignup , addCar } = useSelector((state : any)=> state);
  console.log(carOwnerSignup, addCar);
  try {
    await carOwnerAxios.post('/signup', {carOwnerSignup,addCar })
    .then((res)=>{
      return true;
    })
  } catch (error) {
    return false;
  }
  return false;
}
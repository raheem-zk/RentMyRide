import React, { useEffect, useState } from 'react'
import TabelFrame from './tabelFrame'
import { adminAxios } from '../../axios/axios'

const Cars = ()=> {
  const [carsData, setCarsData] = useState([])
  useEffect(()=>{
    getCarDatas();
  },[])
  const getCarDatas = async ()=>{
    try {
      const response  = await adminAxios.get('/cars')
      console.log(response.data);
      setCarsData(response.data.carsData);
    } catch (error) {
      console.log(error);
    }
  } 
  console.log(carsData)

  const handleAction = ()=>{

  }

  return (
    <TabelFrame heading={'Cars'} data={carsData} handleAction={handleAction} role="cars" />
      
  )
}

export default Cars;

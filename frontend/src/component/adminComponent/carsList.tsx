import React, { useEffect, useState } from 'react'
import TabelFrame from './tabelFrame'
import { adminAxios } from '../../axios/axios'

const Cars = ()=> {
  const [carsData, setCarsData] = useState([]);
  const [update, setUpdate] = useState('');

  useEffect(()=>{
    getCarDatas();
  },[update])

  const getCarDatas = async ()=>{
    try {
      const response  = await adminAxios.get('/cars')
      console.log(response.data);
      setCarsData(response.data.carsData);
      setUpdate('')
    } catch (error) {
      console.log(error);
    }
  } 
  console.log(carsData)

  const handleAction = async (id: string, action: string, message:string)=>{
    await adminAxios.patch(`/cars/${id}/${action}/${message}`);
    console.log(`User ${id} ${action}, ${message}`);
    setUpdate('update');
  }

  return (
    <TabelFrame heading={'Cars'} data={carsData} handleAction={handleAction} role="cars" />
      
  )
}

export default Cars;

import React from 'react'
import AddCar from './addCar'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';

const EditCar = () => {
    const { carId } = useParams();
    const { carsData } = useSelector((state: any)=> state.ownerCars)
    const car = carsData.find((car)=> car._id === carId);
  return (
    <AddCar header={'Edit Your Car Details'} editCarData={car}/>
  )
}

export default EditCar

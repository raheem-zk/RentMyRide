import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { carOwnerAxios } from '../../axios/axios';
import { useSelector } from "react-redux";

const OwnerCars = () => {
 const [cars, setCars] = useState<any[]>([]);
 const { carOwner } = useSelector((state : any)=>state.carOwnerAuth);
 useEffect(() => {
    getCars();
 }, []);

 const getCars = async ()=>{
    const ownerId: string = carOwner._id;
    const response = await carOwnerAxios.get(`/cars/${ownerId}`);
    setCars(response.data.carsData);
 }

 return !cars ? 'Loading...':(
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">My Cars</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cars.map(car => (
          <div key={car?._id} className="bg-white rounded shadow p-4">
            <h3 className="text-xl font-bold mb-2">{car?.brand?.name} {car?.model?.name}</h3>
            <p className="text-gray-600 mb-2">Year: {car?.year}</p>
            <p className="text-gray-600 mb-2">availability: {car?.availability}</p>
            <p className="text-gray-600 mb-2">License Plate: {car?.licensePlate}</p>
            <Link to={`/cars/${car?.id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
 );
};

export default OwnerCars;
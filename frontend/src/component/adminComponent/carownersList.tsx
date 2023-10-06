import React, { useEffect, useState } from 'react'
import TabelFrame from './tabelFrame'
import { adminAxios } from '../../axios/axios';

const OwnerList = () => {
    const [ownersData, setOwnersData] = useState([]);
    useEffect(()=>{
        getOwnersData();
    },[])
    const getOwnersData = async ()=>{
        const response = await adminAxios.get('/car-owners');
        setOwnersData(response.data.carownersData);
    }
    const handleAction =()=>{

    }
  return (
    <TabelFrame heading={'Car Owners'} data={ownersData} handleAction={handleAction} role="car-owners" />
  )
}

export default OwnerList;

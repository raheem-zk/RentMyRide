import React from 'react'
import { useSelector } from 'react-redux'; 
import { useParams } from 'react-router-dom'
import MoreDetails from '../../component/carOwner/orederMoreDetails'

const OrderMoreDetails = () => {
  const { orderId } = useParams();
  const { orders }= useSelector((state: any)=> state?.ownerOrders)
  const data = orders.find((order)=> order._id === orderId);

  return data && <MoreDetails order={data} car={data?.carId} user={data?.userId}/>

}

export default OrderMoreDetails

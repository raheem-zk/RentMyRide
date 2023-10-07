import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CarCard from './carCard';
import { CarouselCustomNavigation } from './homeCarousel';
type StateSlice ={
  userAuth: {}
}

function Homepage() {
    const dispatch = useDispatch();
    const data = useSelector((state : StateSlice )=> state?.userAuth );

  return (
    <>
      {/* <CarouselCustomNavigation/> */}
      <CarCard/>
    </>
  )
}

export default Homepage


import React, { useEffect, useLayoutEffect } from 'react'
import LoginFrame from '../../component/loginFrame';
import SignupPage from '../../component/signUP';
import IsLoggedOut from '../../middleware/isLoggedOut';

function SignUp() {
  // useEffect(()=>{
    IsLoggedOut();
  // },[])
  const imgUrl:string = 'https://www.clcompany.in/wp-content/uploads/2022/10/classic-bmw.png';
  return (
    <LoginFrame SidePart={SignupPage} img={imgUrl}/>
  )
}

export default SignUp;

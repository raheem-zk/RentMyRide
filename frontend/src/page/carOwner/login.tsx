import React from 'react'
import LoginFrame from '../../component/loginFrame'
import LoginForm from '../../component/carOwner/loginForm';

const Login = () => {
  const imgUrl:string = 'https://st3.depositphotos.com/9880800/16702/i/1600/depositphotos_167025970-stock-photo-businessman-at-car-on-parking.jpg';
  
  return (
    <LoginFrame SidePart={LoginForm} img={imgUrl}/>
  )
}

export default Login

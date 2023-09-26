import React from 'react'
import LoginFrame from '../../component/loginFrame';
import SignupPage from '../../component/signUP';

function SignUp() {
  const imgUrl:string = 'https://www.clcompany.in/wp-content/uploads/2022/10/classic-bmw.png';
  return (
    <LoginFrame SidePart={SignupPage} img={imgUrl}/>
  )
}

export default SignUp;

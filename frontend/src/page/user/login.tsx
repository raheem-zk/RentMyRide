

import React, { useEffect } from 'react'
import LoginFrame from '../../component/loginFrame'
import UserLogin from '../../component/userLogin'
import IsLoggedOut from '../../middleware/isLoggedOut'
function Login() {
  IsLoggedOut()
  const imgUrl:string = 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=600';
  return (
    <LoginFrame SidePart={UserLogin} img={imgUrl}/>
    )
}

export default Login;

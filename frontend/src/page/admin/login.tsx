import React from 'react'
import AdminLoginForm from '../../component/adminLoginForm'
import LoginFrame from '../../component/loginFrame'

function Login() {
  const imgUrl:string = 'https://www.roberthalf.com.au/sites/roberthalf.com.au/files/2019-05/admin_staff.jpg';
  return <LoginFrame SidePart={AdminLoginForm} img={imgUrl}/>
}

export default Login

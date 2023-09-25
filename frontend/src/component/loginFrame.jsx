import React from 'react'
import LoginPageLeftImage from './loginPageLeftImage'

function LoginFrame({SidePart}) {
  return (
    <div className="min-h-screen flex my-2 mx-[15%] shadow-xl shadow-gray-700 bg-gray-100 rounded-lg">
      <LoginPageLeftImage />
      <SidePart/>
    </div>
  )
}

export default LoginFrame

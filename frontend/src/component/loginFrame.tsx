import React from 'react'
import LoginPageLeftImage from './loginPageLeftImage'

type LoginFrameProps = {
  SidePart: React.FC;
  img: string;
};

function LoginFrame({ SidePart, img }: LoginFrameProps) {
  return (
    <div className="min-h-screen flex my-2 mx-[15%] shadow-xl shadow-gray-700 bg-gray-100 rounded-lg">
      <LoginPageLeftImage img={img}/>
      <SidePart/>
    </div>
  )
}

export default LoginFrame

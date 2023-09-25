import React from 'react'

function LoginPageLeftImage({img}) {
  return (
    <div className="flex-none w-1/2 hidden md:block rounded-lg">
    <img
      className="w-full h-full object-cover rounded-s-lg"
      // src="https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=600"
      // src='https://www.clcompany.in/wp-content/uploads/2022/10/classic-bmw.png'
      src={img}
      alt="img"
    />
  </div>
  )
}

export default LoginPageLeftImage;

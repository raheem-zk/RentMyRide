

import React, { useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';

const Header = ({PhoneSidebar}) => {
  const [sideButton, setSideButton] = useState(false);

  return (
    <div className='md:w-4/5 w-full h-14 bg-white shadow-lg shadow-gray-500 fixed top-0 md:right-0'>
      <div className='md:hidden block fixed top-2 left-2'>
        <AiOutlineMenu
          size={30}
          onClick={() => setSideButton(!sideButton)}
        />
        
      </div>
      {sideButton &&  <PhoneSidebar/>}
      <div id='profile-pic' className='fixed top-2 right-2'>
        <img
          src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
          alt="profile pic"
          className='w-10 h-10 rounded-full'
        />
      </div>
    </div>
  );
};

export default Header;

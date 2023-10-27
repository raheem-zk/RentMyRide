import React from "react";
import { AiOutlineHome } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { FaCarSide } from 'react-icons/fa';
import { Link } from "react-router-dom";

const PhoneNav = () => {
  return (
    <div className="md:hidden bottom-0 sticky z-10 bg-gray-800 text-white p-4 ">
      <div className="flex justify-between">
        <div>
          <Link to={'/'}>
          <AiOutlineHome size={30}/>
          </Link>
        </div>
        <div>
          <Link to={'/cars'}>
          <FaCarSide size={30}/>
          </Link>
        </div>
        <div>
          <Link to={'/profile'}>
        <CgProfile size={30}/>
        </Link>
        </div>
      </div>
    </div>
  );
};

export default PhoneNav;

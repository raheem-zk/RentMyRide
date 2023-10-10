import React from "react";
import { AiOutlineHome } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { FaCarSide } from 'react-icons/fa';
const PhoneNav = () => {
  return (
    <div className="md:hidden bottom-0 sticky z-10 bg-gray-800 text-white p-4 ">
      <div className="flex justify-between">
        <div>
          <AiOutlineHome size={30}/>
        </div>
        <div>
          <FaCarSide size={30}/>
        </div>
        <div>
        <CgProfile size={30}/>
        </div>
      </div>
    </div>
  );
};

export default PhoneNav;

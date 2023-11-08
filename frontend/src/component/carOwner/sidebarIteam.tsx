import React from "react";
import { Link } from "react-router-dom";
import {
  MdOutlineAddCircleOutline,
  MdOutlineDashboardCustomize,
} from "react-icons/md";
import { PiCarSimpleBold } from "react-icons/pi";
import { CiCircleList } from "react-icons/ci";
import { AiOutlineLogout } from "react-icons/ai"; 
import { BsChatDots } from "react-icons/bs"; 

function OwnerSidebarIteam() {
  return (
    <>
      <div className="mt-5 md:block hidden">
        <img
          className="w-1/4 rounded-full max-h-40 mx-auto"
          src="data:image/jpeg;base64,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"
          alt=""
        />
      </div>
      <nav className="mt-5">
        <ul className="space-y-2">
          <li>
            <Link
              to="/car-owner/dashboard"
              className="flex items-center px-4 py-2 text-white hover:bg-gray-800"
            >
              <MdOutlineDashboardCustomize />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/car-owner/add-car"
              className="flex items-center px-4 py-2 text-white hover:bg-gray-800"
            >
              <MdOutlineAddCircleOutline />
              Add car
            </Link>
          </li>
          <li>
            <Link
              to="/car-owner/cars"
              className="flex items-center px-4 py-2 text-white hover:bg-gray-800"
            >
              <PiCarSimpleBold />
              Cars
            </Link>
          </li>
          <li>
            <Link
              to="/car-owner/chat"
              className="flex items-center px-4 py-2 text-white hover:bg-gray-800"
            >
              <BsChatDots />
              Chat
            </Link>
          </li>
          <li>
            <Link
              to="/car-owner/orders"
              className="flex items-center px-4 py-2 text-white hover:bg-gray-800"
            >
              <CiCircleList />
              Orders List
            </Link>
          </li>
          <li>
            <Link
              to="/car-owner/logout"
              className="flex items-center px-4 py-2 text-white hover:bg-gray-800"
            >
              <AiOutlineLogout />
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default OwnerSidebarIteam;

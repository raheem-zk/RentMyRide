import React, { useState } from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { CiCircleMore } from "react-icons/ci";
import { carOwnerAxios } from "../../axios/axios";

function ActionDropdown({ orderId, reload }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const onApprove = async () => {
    try {
      await carOwnerAxios.patch(`/order/approve/${orderId}`);
      reload();
    } catch (error) {
      // Handle the error, e.g., display an error message
    }
    toggleDropdown();
  };

  const onReject = async () => {
    try {
      await carOwnerAxios.patch(`/order/reject/${orderId}`);
      reload();
    } catch (error) {
      // Handle the error, e.g., display an error message
    }
    toggleDropdown();
  }

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        type="button"
        className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-indigo-500"
        id="options-menu-button"
        aria-expanded={isOpen ? "true" : "false"}
      >
        <CiCircleMore size={20} />
      </button>

      <div
        className={`${
          isOpen ? "block" : "hidden"
        } absolute z-50 right-0 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu-button"
      >
        <div className="py-1 w-full">
          <div className="py-1 w-full">
            <button
              onClick={onApprove}
              className="px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 flex items-center focus:outline-none"
            >
              <span className="mr-2">Approve</span>
              <AiOutlineCheck className="text-green-500" />
            </button>
          </div>
          <div className="py-1 w-full">
            <button
              onClick={onReject}
              className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 flex items-center focus:outline-none"
            >
              <span className="mr-2">Reject</span>
              <AiOutlineClose className="text-red-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActionDropdown;

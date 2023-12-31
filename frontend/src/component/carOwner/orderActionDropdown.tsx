import React, { useState } from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { CiCircleMore } from "react-icons/ci";
import { approveOrder, rejectOrder } from "../../api/carOwnerApi";

function ActionDropdown({ orderId, reload, cancel }: any) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const onApprove = async () => {
    await approveOrder(orderId);
    reload();
    toggleDropdown();
  };

  const onReject = async () => {
    await rejectOrder(orderId);
    reload();
    toggleDropdown();
  };

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
          {cancel ? (
            <div className="py-1 w-full">
              <button
                onClick={onReject}
                className="px-4 py-2 text-sm text-red-600 hover:bg-red-100 hover:text-red-800 flex items-center focus:outline-none rounded-md border border-red-500"
              >
                <span className="mr-2">Approve Cancel Request</span>
              </button>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ActionDropdown;

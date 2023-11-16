import React, { useState } from "react";
import { Link } from "react-router-dom";

const SidebarIteam = () => {
  const [showResources, setShowResources] = useState(false);

  const toggleResources = () => {
    setShowResources(!showResources);
  };
  return (
    <>
      <div className="mt-5 md:block hidden">
        <img
          className="w-1/4 rounded-full max-h-40 mx-auto"
          src="https://static.vecteezy.com/system/resources/previews/009/129/287/original/rmr-logo-rmr-letter-rmr-letter-logo-design-initials-rmr-logo-linked-with-circle-and-uppercase-monogram-logo-rmr-typography-for-technology-business-and-real-estate-brand-vector.jpg"
          alt=""
        />
      </div>
      <nav className="mt-6">
        <ul className="space-y-2">
          <li>
            <Link
              to="/admin/dashboard"
              className="flex items-center px-4 py-2 text-white hover:bg-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {/* Insert your SVG icon here */}
              </svg>
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/admin/users"
              className="flex items-center px-4 py-2 text-white hover:bg-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {/* Insert your SVG icon here */}
              </svg>
              Users
            </Link>
          </li>
          <li>
            <Link
              to="/admin/cars"
              className="flex items-center px-4 py-2 text-white hover:bg-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {/* Insert your SVG icon here */}
              </svg>
              Cars
            </Link>
          </li>
          <li>
            <Link
              to="/admin/car-owners"
              className="flex items-center px-4 py-2 text-white hover:bg-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {/* Insert your SVG icon here */}
              </svg>
              Car Owners
            </Link>
          </li>
          <li>
            <div
              className="flex items-center px-4 py-2 text-white cursor-pointer"
              onClick={toggleResources}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {/* Insert your SVG icon here */}
              </svg>
              Resources
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`ml-auto h-5 w-5 transform ${
                  showResources ? "rotate-0" : "-rotate-90"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={showResources ? "M19 9l-7 7-7-7" : "M9 5l7 7 7-7"}
                />
              </svg>
            </div>
            {showResources && (
              <ul className="px-4 py-2 ">
                <li>
                  <Link
                    to="/admin/district-management"
                    className="flex items-center px-4 py-2 text-white transition duration-300 hover:bg-gray-800 hover:text-blue-300"
                  >
                    District Management
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/fuel-management"
                    className="flex items-center px-4 py-2 text-white transition duration-300 hover:bg-gray-800 hover:text-blue-300"
                  >
                    Fuel Management
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/transmission-management"
                    className="flex items-center px-4 py-2 text-white transition duration-300 hover:bg-gray-800 hover:text-blue-300"
                  >
                    Transmission Management
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/category-management"
                    className="flex items-center px-4 py-2 text-white transition duration-300 hover:bg-gray-800 hover:text-blue-300"
                  >
                    Category Management
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/model-management"
                    className="flex items-center px-4 py-2 text-white transition duration-300 hover:bg-gray-800 hover:text-blue-300"
                  >
                    Model Management
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/brand-management"
                    className="flex items-center px-4 py-2 text-white transition duration-300 hover:bg-gray-800 hover:text-blue-300"
                  >
                    Brand Management
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link
              to="/admin/orders"
              className="flex items-center px-4 py-2 text-white hover:bg-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {/* Insert your SVG icon here */}
              </svg>
              Orders
            </Link>
          </li>
          <li>
            <Link
              to="/admin/logout"
              className="flex items-center px-4 py-2 text-white hover:bg-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
              </svg>
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default SidebarIteam;

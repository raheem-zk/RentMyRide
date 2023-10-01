import React from "react";
import { Link } from "react-router-dom";

function SidebarIteam() {
  return (
    <nav className="mt-6">
      <ul className="space-y-2">
        <li>
          <Link
            to="/car-owner/dashboard"
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
            to="/car-owner/car"
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
            to="/car-owner/orders"
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
            orders 
          </Link>
        </li>
        <li>
          <Link
            to="/products"
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
            Chat
          </Link>
        </li>
        <li>
          <Link
            to="/car-owner/logout"
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
            Logout 
          </Link>
        </li>
        {/* Add more sidebar items as needed */}
      </ul>
    </nav>
  );
}

export default SidebarIteam;

import React from "react";
import { Link } from "react-router-dom";

function SidebarIteam() {
  return (
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

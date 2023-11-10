import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p className="text-lg font-bold">RENT MY RIDE</p>
          <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
        </div>

        <div>
          <p className="text-lg font-bold mb-2">Quick Links</p>
          <ul>
            <li>
              <Link to={`/`} className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to={`/`} className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link to={`/`} className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-lg font-bold mb-2">Car Owners</p>
          <p>
            If you're a car owner,{" "}
            <Link to={`/car-owner/login`} className="hover:underline">
              log in here
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

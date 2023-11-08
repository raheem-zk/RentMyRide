import { Typography } from "@material-tailwind/react";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-white p-8">
      <hr className="my-8 border-blue-gray-50" />
      <Typography color="blue-gray" className="text-center font-normal">
        &copy; 2023 RentMyRide
      </Typography>
    </footer>
  );
};

export default Footer;

import React from "react";
import SidebarIteam from "./sidebarIteam";

function Sidebar() {
  return (
    <div className="w-1/5 min-h-screen bg-gray-900 md:block hidden">
      {/* Logo */}
      <div className="w-full h-16 flex items-center justify-center">
        <img className="w-14 h-14 mt-3 rounded-full" src="https://media.istockphoto.com/id/1290071290/vector/rental-car-icon.jpg?s=612x612&w=0&k=20&c=q4EsvU3jJJYbcZTJ1EzKh6c-Dvy39HagvAUgTCRK9bE=" alt="Logo" />
      </div>

      {/* Sidebar Items */}
      <SidebarIteam/>
    </div>
  );
}

export default Sidebar;

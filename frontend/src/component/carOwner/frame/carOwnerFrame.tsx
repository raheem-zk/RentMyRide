import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header";
import SidebarFrame from "./sidebarFram";
const CarOwnerFrame = () => {
    return(
        <div className="flex">
        {/* <div className="w-1/5 h-screen bg-yellow-900 top-0 sticky">Side bar</div> */}
        <SidebarFrame/>
        <div className="flex-1 flex flex-col">
            {/* Header */}
            {/* <div className="h-16 bg-green-800 top-0 sticky">Header</div> */}
            <Header/>
            {/* Body */}
            <Outlet/>
        </div>
        </div>

  );
};

export default CarOwnerFrame;

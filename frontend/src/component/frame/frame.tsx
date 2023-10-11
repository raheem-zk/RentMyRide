import React from "react";
import { Outlet } from "react-router-dom";
import SidebarFrame from "./sidebarFrame";
import Header from "./headerFrame";

const Frame = ({ sidebarIteam }) => {
  return (
    <div className="flex">
      {/* sidebar */}
      <SidebarFrame Iteams={sidebarIteam} />
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header Iteams={sidebarIteam} />
        {/* Body part */}
        <Outlet />
      </div>
    </div>
  );
};


export default Frame;
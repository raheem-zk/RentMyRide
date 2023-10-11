import React from "react";

const SidebarFrame = ({Iteams}) => {
    return (
      <div className="w-1/5 md:block z-10 hidden h-screen bg-gray-700 top-0 sticky">
          <Iteams/>
      </div>
  
    )
  }

  export default SidebarFrame;
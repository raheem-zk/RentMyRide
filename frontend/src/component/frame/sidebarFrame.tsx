import React from "react";

const SidebarFrame = ({Iteams}) => {
    return (
      <div className="w-1/5 md:block z-10 hidden min-h-screen h-full bg-gray-700 top-0 sticky">
          <Iteams/>
      </div>
  
    )
  }

  export default SidebarFrame;
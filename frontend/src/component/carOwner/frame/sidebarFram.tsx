import React from 'react'
import OwnerSidebarIteam from './sidebarIteam'

const SidebarFrame = () => {
  return (
    <div className="w-1/5 md:block z-10 hidden h-screen bg-gray-700 top-0 sticky">
        <OwnerSidebarIteam/>
    </div>

  )
}

export default SidebarFrame

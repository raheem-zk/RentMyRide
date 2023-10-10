import React from 'react'
import Sidebar from './sidebar';
import SidebarIteam from './sidebarIteam';
import Header from './header';
import { Outlet } from 'react-router-dom';
import PhoneSidebar from './phoneSidebar';


function AdminFrame() {
  return (
    <div className='w-[100%] h-full flex'>
      <Sidebar SidebarIteam={SidebarIteam}/>
      <Header PhoneSidebar={PhoneSidebar}/>
        <Outlet/>
    </div>
  )
}

export default AdminFrame

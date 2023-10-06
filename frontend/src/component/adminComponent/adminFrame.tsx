import React from 'react'
import Sidebar from './sidebar';
import SidebarIteam from './sidebarIteam';
import Header from './header';
import { Outlet } from 'react-router-dom';

function AdminFrame() {
  return (
    <div className='w-[100%] h-full flex'>
      <Sidebar SidebarIteam={SidebarIteam}/>
      <Header />
      <Outlet /> 
    </div>
  )
}

export default AdminFrame

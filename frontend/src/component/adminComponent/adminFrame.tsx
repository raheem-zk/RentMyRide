import React from 'react'
// import Sidebar from './sidebar'
// import Header from './header'

type AdminFrameProps = {
  Body: React.ComponentType; 
  Sidebar: any
  Header: React.ComponentType;
  SidebarIteam : React.ComponentType;
}
function AdminFrame({Body, Sidebar, Header, SidebarIteam}: AdminFrameProps ) {
  return (
    <div className='w-[100%] h-full flex'>
      <Sidebar SidebarIteam={SidebarIteam}/>
      <Header />
      <Body/>
    </div>
  )
}

export default AdminFrame

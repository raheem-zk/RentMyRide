import React from 'react'
import Sidebar from './sidebar'
import Header from './header'

type AdminFrameProps = {
  Body: React.ComponentType; 
}
function AdminFrame({Body}: AdminFrameProps ) {
  return (
    <div className='w-[100%] h-full flex'>
      <Sidebar />
      <Header />
      <Body/>
    </div>
  )
}

export default AdminFrame

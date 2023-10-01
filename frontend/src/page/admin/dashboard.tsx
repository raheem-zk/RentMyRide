import React from 'react';
import AdminFrame from '../../component/adminComponent/adminFrame';
import Sidebar from '../../component/adminComponent/sidebar';
import Header from '../../component/adminComponent/header';
import SidebarIteam from '../../component/adminComponent/sidebarIteam';

function Dashboard() {
  const data =()=><>hlo its admin dashboard</>
  return (  
  <AdminFrame Body={data} Sidebar={Sidebar} SidebarIteam={SidebarIteam} Header={Header}/>
  )
}

export default Dashboard

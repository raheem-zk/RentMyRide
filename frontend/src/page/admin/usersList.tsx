import React from 'react'
import AdminFrame from '../../component/adminComponent/adminFrame'
import userListTable from '../../component/adminComponent/userList'
import Sidebar from '../../component/adminComponent/sidebar';
import Header from '../../component/adminComponent/header';
import SidebarIteam from '../../component/adminComponent/sidebarIteam';

function UserList() {
  return (
    <AdminFrame Body={userListTable} Sidebar={Sidebar} SidebarIteam={SidebarIteam} Header={Header}/>
  )
}

export default UserList

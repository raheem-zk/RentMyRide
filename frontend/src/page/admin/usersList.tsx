import React from 'react'
import AdminFrame from '../../component/adminComponent/adminFrame'
import userListTable from '../../component/adminComponent/userList'

function UserList() {
  return (
    <AdminFrame Body={userListTable}/>
  )
}

export default UserList

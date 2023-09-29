import React, { useEffect, useState } from 'react';
import TabelFrame from './tabelFrame';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUsers } from '../../redux/admin/usersSlice';

function userListTable() {
  const [usersList, setUserList ] = useState([]);
  const dispath = useDispatch();
  useEffect(()=>{
    getUserData();
  },[])
  
  const getUserData = async ()=>{
    await axios.get(`${import.meta.env.VITE_BACKEND_ADMIN_API_URL}/users`)
    .then((res)=>{
      console.log(res.data.userData)
      setUserList(res.data.userData);
      dispath(addUsers(res.data.userData));
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  const heading = 'Users'
  return (
    <TabelFrame heading={heading} data={usersList}/>
  )
}

export default userListTable;
import React, { useEffect, useState } from 'react';
import TabelFrame from './tabelFrame';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUsers } from '../../redux/admin/usersSlice';

function UserListTable() {
  const [usersList, setUserList] = useState([]);
  const [update, setUpdate] = useState('');
  const dispatch = useDispatch(); 

  useEffect(() => {
    getUserData();
  }, [update]);

  const getUserData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_ADMIN_API_URL}/users`);
      const userData = response.data.userData;
      console.log(userData);
      setUserList(userData);
      setUpdate('');
      dispatch(addUsers(userData)); 
    } catch (err) {
      console.error(err);
    }
  }

  const handleAction = async (id: string, action: string) => {
    try {
      await axios.patch(`${import.meta.env.VITE_BACKEND_ADMIN_API_URL}/users/${id}/${action}`);
      console.log(`User ${id} ${action}ed`);
      setUpdate('update');
    } catch (error) {
      console.error(error);
    }
  }

  const heading = 'Users';

  return (
    <TabelFrame heading={heading} data={usersList} handleAction={handleAction} role="users" />
  )
}

export default UserListTable;

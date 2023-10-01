import React, { useEffect, useState } from 'react';
import TabelFrame from './tabelFrame';
import { useDispatch } from 'react-redux';
import { addUsers } from '../../redux/admin/usersSlice';
import axiosInstance from '../../axios/axios';

function UserListTable() {
  const [usersList, setUserList] = useState([]);
  const [update, setUpdate] = useState('');
  const dispatch = useDispatch(); 

  useEffect(() => {
    getUserData();
  }, [update]);

  const getUserData = async () => {
    try {
      const response = await axiosInstance('adminToken').get(`/admin/users`);
      const userData = response?.data?.userData;
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
      await axiosInstance('adminToken').patch(`/admin/users/${id}/${action}`);
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

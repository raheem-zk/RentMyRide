import React from 'react'
import ProfileEdit from '../../component/user/editProfile'
import { useSelector } from 'react-redux'

const EditProfile = () => {
  const { user } = useSelector((state: any)=>state?.userAuth)

  return user && <ProfileEdit data={user}/>
}

export default EditProfile

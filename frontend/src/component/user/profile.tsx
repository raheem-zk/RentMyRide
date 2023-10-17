import React from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const demoImage = 'https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg';

const Profile = () => {
  const { user } = useSelector((state: any) => state.userAuth);
  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="bg-white shadow rounded p-6 relative">
        <Link
          to="/profile/edit"
          className="px-3 py-3 hover:bg-gray-100 rounded-full absolute right-3 top-3"
        >
          <AiOutlineEdit size={25} />
        </Link>
        <div className="text-center">
          <img
            className="mx-auto rounded-full h-24 w-24 object-cover"
            src={user.avatar ? user.avatar : demoImage }
            alt={`${user.firstName} ${user.lastName}`}
          />
          <h2 className="mt-4 text-xl font-semibold">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-gray-600">{user.title}</p>
        </div>

        <div className="mt-8 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-semibold">Email</span>
            <span>{user.email}</span>
          </div>
          {user.phoneNumber && (
            <div className="flex items-center justify-between">
              <span className="font-semibold">Phone</span>
              <span>{user.phoneNumber}</span>
            </div>
          )}
          {user.place && (
            <div className="flex items-center justify-between">
              <span className="font-semibold">Place</span>
              <span>{user.place}</span>
            </div>
          )}
          {user.age && (
            <div className="flex items-center justify-between">
              <span className="font-semibold">Age</span>
              <span>{user.age}</span>
            </div>
          )}
          {user.address && (
            <div className="flex items-center justify-between">
              <span className="font-semibold">Address</span>
              <span>{user.address}</span>
            </div>
          )}
          {user.license && (
            <div className="flex items-center justify-between">
              <span className="font-semibold">License</span>
              <span>{user.license}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

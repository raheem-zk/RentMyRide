import React from "react";
import { Link } from "react-router-dom";

const ProfileEditDropdown = () => {
  return (
    <div
      className=" origin-top-right absolute right-0 mt-10 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="options-menu"
    >
      <div className="py-1" role="menuitem" aria-selected="true">
        <Link
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
          to={"/profile/edit"}
        >
          Edit Profile
        </Link>
        <Link
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
          to={"/profile/edit-password"}
        >
          Edit Password
        </Link>
      </div>
    </div>
  );
};

export default ProfileEditDropdown;

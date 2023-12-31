import React, { useEffect } from "react";

const PROFILE =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1nXLwXy9EcTEeouOXhDl6Ma2ZaKs899xpHg&usqp=CAU";

  const Conversation = ({ data, role , online}) => {

  const ownerProfilePicture = data?.ownerId?.profilePicture;
  const userProfilePicture = data?.userId?.profilePicture;
  const src =
    role === "user"
      ? ownerProfilePicture || PROFILE
      : userProfilePicture || PROFILE;
  const name =
    role === "user" ? data?.ownerId?.firstName : data?.userId?.firstName;

  return (
    <>
      <div key={data._id} className="flex items-center p-2 hover:bg-gray-200 cursor-pointer">
        <img
          src={src}
          alt="User Avatar"
          className="rounded-full w-12 h-12 p-2 mx-2"
        />
        <div>
          <span className="text-lg font-semibold">{name}</span>
          <span className="text-sm text-gray-400">{online ?"Online" : "Offline"}</span>
        </div>
      </div>
      <hr />
    </>
  );
};

export default Conversation;

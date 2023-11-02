import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const UserMoreDetails = () => {
  const { userId } = useParams();
  const { users } = useSelector((state: any) => state.usersList);

  const user = users.find((user) => user._id === userId);

  if (!user) {
    return <div>User not found</div>;
  }
  return (
    <div className="md:m-5 bg-white p-4 rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-center mb-4 text-indigo-600">
        User Details
      </h1>
      <div>
        <div className="bg-white shadow-lg p-6 rounded-lg mx-auto m-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex justify-center items-center">
              <img
                src={
                  user?.profilePicture
                    ? user.profilePicture
                    : "https://thumbs.dreamstime.com/b/flat-male-avatar-image-beard-hairstyle-businessman-profile-icon-vector-179285629.jpg"
                }
                alt="Car"
                className="h-auto"
              />
            </div>
            <div className="flex-col justify-center my-5">
              <p className="text-lg mb-2">
                Name:{" "}
                <span className="font-semibold">
                  {user?.firstName} {user?.lastName}
                </span>
              </p>
              <p className="text-lg mb-2">
                Email: <span className="font-semibold">{user?.email}</span>
              </p>
              <p className="text-lg mb-2">
                Phone Number:{" "}
                <span className="font-semibold">{user?.phoneNumber}</span>
              </p>
              <p className="text-lg mb-2">
                Licence Number:{" "}
                <span className="font-semibold">{user?.license}</span>
              </p>
              <p className="text-lg mb-2">
                Address: <span className="font-semibold">{user?.address}</span>
              </p>
              <p className="text-lg mb-2">
                Age:{" "}
                <span className="font-semibold">
                  {user?.age ? user?.age : "not Updated"}
                </span>
              </p>
            </div>
            <div className="flex-col justify-center my-5">
              <p>CreateAt: {user?.createdAt}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMoreDetails;

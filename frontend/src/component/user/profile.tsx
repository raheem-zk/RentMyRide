import React, { useEffect, useRef, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import ProfileEditDropdown from "./profileEditDropdown";
import { setProfile } from "../../redux/user/authSlice";
import { profileUploadCloudinery, updateProfileImage } from "../../api/userApi";
import { BsFillTagsFill } from "react-icons/bs";
import WalletHistory from "./walletHistory";
const demoImage =
  "https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg";

const Profile = () => {
  const { user } = useSelector((state: any) => state.userAuth);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const result = await profileUploadCloudinery(file);
      const response = await updateProfileImage(user?._id, result);
      response && setSelectedImage(result);
    }
  };

  useEffect(() => {
    if (selectedImage) {
      const data = { profilePicture: selectedImage };
      dispatch(setProfile(data));
      setSelectedImage(null);
    }
  }, [selectedImage, setProfile]);

  return !user ? (
    ""
  ) : (
    <>
<div className="fixed inset-y-0 z-10 right-0 bg-green-500 w-1/2 flex justify-center items-center">
  {/* <div> */}
    <WalletHistory />
  {/* </div> */}
</div>


    <div className="max-w-screen-lg mx-auto">
      <div className="bg-white shadow rounded p-6 relative">
        <button
          onClick={toggleDropdown}
          className="px-3 py-3 hover:bg-gray-100 rounded-full absolute right-3 top-3"
        >
          <AiOutlineEdit size={25} />
        </button>
        {isDropdownOpen && <ProfileEditDropdown />}
        <div className="text-center">
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleImageUpload}
          />
          <img
            className="mx-auto rounded-full h-24 w-24 object-cover cursor-pointer"
            src={user?.profilePicture ? user.profilePicture : demoImage}
            alt={`${user.firstName} ${user.lastName}`}
            onClick={() => fileInputRef.current.click()}
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
          {user.wallet && (
            <div className="flex items-center justify-between">
              <span className="font-semibold">Wallet</span>
              <div className="flex items-center">
                <span className="text-green-500">{user.wallet?.balance}</span>
                <BsFillTagsFill className="ml-2 text-green-500" />
              </div>
            </div>
          )}
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
    </>
  );
};

export default Profile;

import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { NotUpdated } from '../../utils/adminUtils';

const UserMoreDetails = () => {
    const { userId } = useParams();
    const { users } = useSelector((state) => state.usersList);

    const user = users.find((user) => user._id === userId);

    if (!user) {
        return <div>User not found</div>;
    }
    return (
        <div className="md:m-5 bg-white p-4 rounded-lg shadow-lg">
            <h1 className="text-3xl font-semibold text-center mb-4 text-indigo-600">User Details</h1>
            <table className="w-full">
            <tr>
                    <th className="bg-gray-800 text-white p-2">Profile Photo</th>
                    <td className="p-2">
                        {user?.profilePicture ? (
                            <img
                                src={user.profilePicture}
                                alt="Profile"
                                className="rounded-full w-16 h-16"
                            />
                        ) : <NotUpdated />}
                    </td>
                </tr>
                <tr>
                    <th className="bg-gray-800 text-white p-2">ID</th>
                    <td className="p-2">{user?._id}</td>
                </tr>
                <tr>
                    <th className="bg-gray-800 text-white p-2">First Name</th>
                    <td className="p-2">{user?.firstName }</td>
                </tr>
                <tr>
                    <th className="bg-gray-800 text-white p-2">Last Name</th>
                    <td className="p-2">{user?.lastName}</td>
                </tr>
                <tr>
                    <th className="bg-gray-800 text-white p-2">Email</th>
                    <td className="p-2 text-blue-500">{user?.email}</td>
                </tr>
                <tr>
                    <th className="bg-gray-800 text-white p-2">Status</th>
                    <td className="p-2 text-green-500 font-semibold">{user?.status ? "Active" : "Inactive" }</td>
                </tr>
                <tr>
                    <th className="bg-gray-800 text-white p-2">Phone</th>
                    <td className="p-2">{user?.phoneNumber ?user?.phoneNumber : <NotUpdated/>}</td>
                </tr>
                <tr>
                    <th className="bg-gray-800 text-white p-2">Place</th>
                    <td className="p-2">{user?.place ? user?.place : <NotUpdated/>}</td>
                </tr>
                <tr>
                    <th className="bg-gray-800 text-white p-2">Age</th>
                    <td className="p-2">{user?.age ? user?.age : <NotUpdated/>}</td>
                </tr>
                <tr>
                    <th className="bg-gray-800 text-white p-2">license</th>
                    <td className="p-2">{user?.license ? user?.license : <NotUpdated/>}</td>
                </tr>
                <tr>
                    <th className="bg-gray-800 text-white p-2">Address</th>
                    <td className="p-2">{user?.address ? user?.address :<NotUpdated/>}</td>
                </tr>
                <tr>
                    <th className="bg-gray-800 text-white p-2">Joined Date</th>
                    <td className="p-2 text-gray-500">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : ''}</td>                </tr>
            </table>
        </div>
    );
};

export default UserMoreDetails;

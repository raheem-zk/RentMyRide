import React from "react";
import { FiEye, FiSettings, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";

interface data {
  _id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  phoneNumber: number;
  place: string | null;
  age: number;
  address: string | null;
  license: string | null;
  profilePicture: string | null;
  gender: string | null;
  status: boolean;
  createdAt: Date;
}

type tabelFrameProps = {
  heading: string | null;
  data: data[];
};
FiSettings;

function TabelFrame({ heading, data }: tabelFrameProps) {
  console.log(data);
  return (
    <div className="h-fit mt-16 md:w-4/5 w-full">
      <div id="Header">{heading}</div>
      <div className="m-4 p-3 shadow-md shadow-gray-500">
        <div className="w-full h-12 shadow shadow-gray-500 flex items-center justify-between">
          <h1 className="text-black md:text-2xl py-1 pl-3 font-bold">
            User Management
          </h1>
          <div className="flex items-center mr-3">
            <input
              type="text"
              className="rounded-full bg-gray-300 py-1 px-2 text-gray-200"
              placeholder="Search"
            />
          </div>
        </div>

        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 text-center">#</th>
              <th className="px-4 py-2 text-center">Name</th>
              <th className="px-4 py-2 text-center">Status</th>
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr className="hover:bg-gray-100" key={index}>
                <td className="text-center">{index + 1}</td>
                <td className="px-4 py-2 text-center">
                  <div className="flex items-center space-x-2 justify-center">
                    <div className="w-10 h-10 flex">
                      <img
                        src={
                          item.profilePicture
                            ? item.profilePicture
                            : "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                        }
                        alt="profile pic"
                        className="w-full h-full rounded-full"
                      />
                    </div>
                    <p className="font-semibold">
                      {item.firstName} {item.lastName}
                    </p>
                  </div>
                </td>
                <td className="px-4 py-2 text-center">
                  {item.status ? "Active" : "Inactive"}
                </td>
                <td className="text-center">
                  <div className="flex items-center justify-center">
                    {item.status ? (
                      <Link
                        to={`/admin/users/${item._id}/unblock`}
                        className="m-5"
                      >
                        <FiEye />
                      </Link>
                    ) : (
                      <Link
                        to={`/admin/users/${item._id}/block`}
                        className="m-5"
                      >
                        <FiEyeOff />
                      </Link>
                    )}
                    <Link
                      to={`/admin/users/${item._id}/settings`}
                      className="m-5"
                    >
                      <FiSettings />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TabelFrame;

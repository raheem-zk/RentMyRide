import React, { useState } from "react";
import { FiEye, FiSettings, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";

interface Data {
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
  status: boolean | string;
  createdAt: Date;
}

type TabelFrameProps = {
  heading: string | null;
  data: Data[] | null;
  handleAction: (id: string, status: string) => void;
  role: string;
};

function TabelFrame({ heading, data, handleAction, role }: any) {
  const [modal, setModal] = useState(true);
  const [message, setMessage] = useState("");
  const [id, setId] = useState("");
  const [status, setStatus] = useState("");
  const handleClick = (id: string, status: string, message: any) => {
    handleAction(id, status);
  };

  const handleModal = () => {
    setModal(!modal);
  };
  const handleStatus = (id, status) => {
    if (status == "Reject") {
      setId(id);
      setStatus(status);
      handleModal();
    } else {
      handleClick(id, status, message);
    }
  };

  const submitMessage = () => {
    handleClick(id, status, message);
  };

  return (
    <div className="h-fit mt-16 md:w-4/5 w-full">
      {/* <div id="Header">{heading}</div> */}
      <div className="m-4 p-3 shadow-md shadow-gray-300">
        <div className="w-full h-12 shadow shadow-gray-300 flex items-center justify-between">
          <h1 className="text-black md:text-2xl py-1 pl-3 font-bold">
            {heading} Management
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
            {data.map((item: any, index: number) => (
              <tr className="hover:bg-gray-100" key={index}>
                <td className="text-center">{index + 1}</td>
                <td className="px-4 py-2 text-center">
                  <div className="flex items-center space-x-2 justify-center">
                    <div className="w-10 h-10 flex">
                      <img
                        src={
                          item.profilePicture
                            ? item.profilePicture
                            : item.images
                            ? item.images[0]
                            : "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                        }
                        alt="profile pic"
                        className="w-full h-full rounded-full"
                      />
                    </div>
                    <p className="font-semibold">
                      {item?.firstName} {item?.lastName} {item?.carName}
                    </p>
                  </div>
                </td>
                <td className="px-4 py-2 text-center">
                  {item.status ? "Active" : "Inactive"}
                </td>
                <td className="text-center">
                  <div className="flex items-center justify-center">
                    {item?.status === true ? (
                      <button
                        onClick={() => handleClick(item._id, "block", "")}
                        className="m-5"
                      >
                        <FiEye />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleClick(item._id, "unblock", "")}
                        className="m-5"
                      >
                        <FiEyeOff />
                      </button>
                    )}
                    {item?.status === "Pending" ? (
                      <select
                        id="carStatus"
                        value={item?.status}
                        onChange={(e) => handleStatus(item._id, e.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approve">Approve</option>
                        <option value="Reject">Reject</option>
                      </select>
                    ) : (
                      item?.status === "Approve" && (
                        <select
                          id="carStatus"
                          value={item?.status}
                          onChange={(e) =>
                            handleStatus(item._id, e.target.value)
                          }
                        >
                          <option value="Approve">Approve</option>
                          <option value="Reject">Reject</option>
                        </select>
                      )
                    )}

                    <Link
                      className="m-5"
                      to={`/admin/${role}/${item._id}/more-details`}
                    >
                      <FiSettings />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
            {modal && (
              <>
                <div className="fixed inset-0 z-50 overflow-x-hidden overflow-y-auto flex justify-center items-center">
                  <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-semibold mb-4">
                      Car Rejection Notification
                    </h3>
                    <input
                      type="text"
                      placeholder="eg:-wrong details entered"
                      className="w-full border rounded-lg px-3 py-2 mb-4"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <div className="flex justify-end">
                      <button
                        className="text-red-500 font-semibold mr-4"
                        onClick={handleModal}
                      >
                        Cancel
                      </button>
                      <button
                        className="bg-emerald-500 text-white font-semibold px-4 py-2 rounded-lg"
                        onClick={submitMessage}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
                <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TabelFrame;

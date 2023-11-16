import React, { useLayoutEffect, useState } from "react";
import Loading from "../../loading";
import ZeroDataComponent from "../../zeroData";
import { Resource, ResourcesProps } from "../../../models/models";

const ResourcesTable = ({
  data,
  title,
  handleBlockToggle,
  handleUpdate,
}: ResourcesProps) => {
  const [load, setLoad] = useState(true);
  const [editIndex, setEditIndex] = useState(-1);
  const [editValue, setEditValue] = useState("");
  useLayoutEffect(() => {
    if (data) {
      setLoad(false);
    }
  }, []);

  const handleEditClick = (id, value) => {
    setEditIndex(id);
    setEditValue(value);
  };
  const update = (id, value)=>{
    handleUpdate(id, value);
    setEditIndex(-1);
    setEditValue('');
  }
  return load ? (
    <Loading />
  ) : (
    <div className="overflow-x-auto">
      <h1 className="text-3xl font-bold text-gray-800 my-4 flex items-center justify-center">
        {title}
      </h1>

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-left">NO</th>
            <th className="py-2 px-4 text-left">Category Name</th>
            <th className="py-2 px-4 text-left">Edit</th>
            <th className="py-2 px-4 text-left">Block/Unblock</th>
          </tr>
        </thead>
        <tbody>
          {data.length == 0 ? (
            <ZeroDataComponent />
          ) : (
            data.map((item: Resource, index: number) => (
              <tr key={item?._id} className="border-b border-gray-200">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">
                  {editIndex == item?._id ? (
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="border border-gray-300 px-2 py-1"
                    />
                  ) : (
                    <input
                      value={item?.name}
                      className="border border-gray-300 px-2 py-1"
                    />
                  )}
                </td>
                <td className="py-2 px-4">
                  {editIndex == item?._id ? (
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => update(item?._id, editValue)}
                    >
                      Update
                    </button>
                  ) : (
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => handleEditClick(item?._id, item?.name)}
                    >
                      Edit
                    </button>
                  )}
                </td>
                <td className="py-2 px-4">
                  <button
                    className={`${
                      item?.status ? "text-red-600" : "text-green-600"
                    } hover:underline`}
                    onClick={() => handleBlockToggle(item?._id, item?.status)}
                  >
                    {item?.status ? "Block" : "Unblock"}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ResourcesTable;

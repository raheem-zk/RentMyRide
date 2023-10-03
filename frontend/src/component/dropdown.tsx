import React, { useEffect, useState } from "react";
import { DropdownProps } from "../models/models";

const Dropdown: React.FC<DropdownProps> = ({ data, title, AddingForm, HandleForm, Reload , handleCarDetailsChange}) => {
  const [item, setItem] = useState("");
  const [add, setAdd] = useState(false);
  const action = ()=>{
    setAdd(!add);
  }
  const handleChenge = (e)=>{
    setItem(e.target.value);
    if (e.target.value == "add" ) {
      action();
    }
    handleCarDetailsChange(e)
  }

  return (
    <div className="relative inline-block text-left w-full">
      <div className="mb-4">
        <label
          htmlFor="transmission"
          className="block text-sm font-medium text-gray-700"
        >
          {title}
        </label>
        <select
          id="transmission"
          name={title}
          value={item}
          onChange={handleChenge}
          className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:ring focus:ring-opacity-50"
        >
          <option value="" className="text-green-800 ">select one</option>
          {data &&
            data.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          <option value="add" className="text-green-800 ">Add a {title}</option>
        </select>
      </div>
      {add && <AddingForm Reload={Reload} title={title} handleAdding={HandleForm} action={action} handleCarDetailsChange={handleCarDetailsChange}/>}
    </div>
  );
};

export default Dropdown;

import React, { useEffect, useState } from 'react';
import AddBrand from './carOwner/addBrand';

const AddTransmission = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Add Transmission"
      value={value}
      onChange={onChange}
      className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:ring focus:ring-opacity-50"
    />
  );
};

const Dropdown = ({data, title, AddingForm, HandleForm}) => {
  const [item, setItem] = useState('');
  const [add, setAdd] = useState(false);
  const [newData, setNewData] = useState('');
    useEffect(()=>{
        if(item =='add'){
            setAdd(!add);
          }
    },[item])
  return (
    <div className="relative inline-block text-left">
      <div className="mb-4">
        <label htmlFor="transmission" className="block text-sm font-medium text-gray-700">
         { title } 
        </label>
        <select
          id="transmission"
          name="transmission"
          value={item}
          onChange={(e)=>setItem(e.target.value)}
          className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:ring focus:ring-opacity-50"
        >
          <option value="">Select { title }</option>
          {data && data.map((item)=>
          (
          <option value="Automatic">{item}</option>
          ))}
          <option value="add">Add a {title} </option>
        </select>
      </div>
        { add && 
        <AddingForm title={title} HandleSubmit={HandleForm}/>
        }
    </div>
  );
};

export default Dropdown;

import React from "react";
const img= "https://img.freepik.com/free-vector/no-data-concept-illustration_114360-2506.jpg"
const ZeroDataComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center  bg-gray-100">
      <img
        className="h-72"
        src={img}
        alt="Profile image"
      />
      <p className="text-gray-600">No data found</p>
    </div>
  );
};


export default ZeroDataComponent;

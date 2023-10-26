import React from "react";

const NoCar = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="text-center">
        <p className="text-2xl font-bold mb-4">No Cars Found</p>
        <p className="text-gray-500">
          Sorry, there are no cars available at the moment.
        </p>
      </div>
    </div>
  );
};

export default NoCar;

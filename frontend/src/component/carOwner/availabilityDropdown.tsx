import React, { useState } from "react";
import { updateAvailability } from "../../api/carOwnerApi";
import { successMessage } from "../../utils/utils";

const AvailabilityDropdown = ({ currentStatus, carId }) => {
  const [availability, setAvailability] = useState(currentStatus);

  const handleAvailabilityChange = async (event) => {
    const newAvailability = event.target.value;
    setAvailability(newAvailability);
    const data = { carId, newAvailability };
    await updateAvailability(data);
    successMessage("Availability updated successfully!");
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700">
        Availability
      </label>
      <select
        value={availability}
        onChange={handleAvailabilityChange}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option value="Available">Available</option>
        <option value="Service">Service</option>
        <option value="Busy">Busy</option>
        <option value="Unavailable">Unavailable</option>
        <option value="Away">Away</option>
      </select>
    </div>
  );
};

export default AvailabilityDropdown;

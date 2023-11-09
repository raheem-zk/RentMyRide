import React, { useEffect, useState } from "react";
import { ErrorMessage } from "../utils/utils";
import { getDistrictAPI } from "../api/userApi";
import { Spec } from "../models/models";

const DateBasedFilter = ({ handleDateSearch }) => {
  // district, startDate, endDate
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [district, setDistrict] = useState<Spec[]>([]);
  const handleSearch = () => {
    const currentDate = new Date();
    const selectedEndDate = new Date(endDate);
    const selectedStartDate = new Date(startDate);
    if (selectedEndDate < currentDate) {
      ErrorMessage("Please select a future date for the end date.");
    } else if (selectedEndDate < selectedStartDate) {
      ErrorMessage("End date cannot be before start date.");
    } else {
      // Perform search
      handleDateSearch(startDate, endDate, district);
    }
  };
  
  const getDistrict = async () => {
    const data = await getDistrictAPI();
    setDistrict(data);
  };

  useEffect(() => {
    getDistrict();
  }, []);

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="bg-white rounded-md shadow-md p-6">
        <label className="block text-gray-600 mb-2 font-medium">
          Search by Date Range:
        </label>
        <div className="grid grid-cols-2 gap-4">
          <div className="py-2 flex">
            <input
              type="date"
              className="flex-1 form-input rounded-md border focus:outline-none focus:ring focus:border-blue-300 py-1"
              placeholder="Start Date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="py-2 flex">
            <input
              type="date"
              className="flex-1 form-input rounded-md border focus:outline-none focus:ring focus:border-blue-300 py-1"
              placeholder="End Date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className="py-2 col-span-2">
            <select
              className="form-select block w-full rounded-md border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              name="state"
            >
              <option value="" disabled selected>
                Select a state
              </option>
              {district &&
                district.map((data) => (
                  <option key={data?._id} value={data?._id}>
                    {data?.name}
                  </option>
                ))}
            </select>
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none col-span-2"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateBasedFilter;

import React, { useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";
import { filteredData, getFilterOptionsData } from "../api/userApi";
import { filterModel, filterOptionsDatas } from "../models/models";
import DateBasedFilter from "./dateBasedFilter";

const Filter = ({ filteredCars, handlePagenation, handleSize }) => {
  const [filterOptions, setFilterOptions] = useState<filterOptionsDatas>({
    category: [],
    brand: [],
    model: [],
    transmission: [],
    fuelType: [],
    district :[],
  });
  const getFilterOptions = async () => {
    const data = await getFilterOptionsData();
    setFilterOptions({ ...filterOptions, ...data });
  };

  useEffect(() => {
    getFilterOptions();
  }, []);

  const [filterData, setFilterData] = useState<filterModel>({
    searchText: "",
    category: "",
    brand: "",
    model: "",
    fuelType: "",
    transmition: "",
    page: 1,
    sortOrder: "",
    startDate: "",
    endDate: "",
    district:""
  });

  const handleFilter = (key, value) => {
    if (value.checked) {
      setFilterData({ ...filterData, [key]: value.value });
    } else {
      const { [key]: removedValue, ...updatedFilterData } = filterData;
      setFilterData(updatedFilterData);
    }
  };

  const getFilterData = async () => {
    const { data, size } = await filteredData(filterData);
    filteredCars(data);
    handleSize(size ?? 1);
  };

  useEffect(() => {
    setFilterData({ ...filterData, page: handlePagenation });
  }, [handlePagenation]);

  const handleSearch = (e) => {
    setFilterData({ ...filterData, ["searchText"]: e.target.value });
  };

  const handleSort = (value) => {
    setFilterData({ ...filterData, sortOrder: value });
  };

  useEffect(() => {
    getFilterData();
  }, [filterData]);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleDateSearch = (startDate, endDate, districtt) => {
    const updatedFilterData = {
      ...filterData,
      startDate: startDate,
      endDate: endDate,
      districtt: districtt
    };
    setFilterData(updatedFilterData);
  };

  return (
    <div>
      <div className="relative  mt-3 mx-2">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MdSearch className="text-gray-500 h-5 w-5" />
        </div>
        <input
          type="text"
          className="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="Search for cars..."
          value={filterData?.searchText}
          onChange={handleSearch}
        />
      </div>
      <DateBasedFilter handleDateSearch={handleDateSearch}/>

      <div className="max-w-md mx-auto p-4">
        <div className="bg-white rounded-md shadow-md p-6">
          <label className="block text-gray-600 mb-2 font-medium">
            Search by Date Range:
          </label>
          <div className=" ">
            <div className="py-2">
              <input
                type="date"
                className="flex-1 form-input rounded-md border focus:outline-none focus:ring focus:border-blue-300 py-1"
                placeholder="Start Date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="py-2">
              <input
                type="date"
                className="flex-1 form-input rounded-md border focus:outline-none focus:ring focus:border-blue-300 py-1"
                placeholder="End Date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none "
              onClick={handleDateSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div>
        <label className="m-2 flex items-center">
          <input
            type="radio"
            name="sorting"
            checked={filterData.sortOrder === "lowToHigh"}
            onChange={() => handleSort("lowToHigh")}
            className="form-radio h-4 w-5 text-blue-600"
          />
          <span className="ml-2 text-gray-800">Sort Low to High</span>
        </label>

        <label className="m-2 flex items-center">
          <input
            type="radio"
            name="sorting"
            checked={filterData.sortOrder === "highToLow"}
            onChange={() => handleSort("highToLow")}
            className="form-radio h-4 w-5 text-blue-600"
          />
          <span className="ml-2 text-gray-800">Sort High to Low</span>
        </label>
      </div>

      <div>
        {filterOptions &&
          Object.keys(filterOptions).map((key) => (
            <div key={key} className="p-4 border rounded-lg shadow-md m-2">
              <p className="font-semibold text-xl">{key.toUpperCase()}</p>
              <div className="mt-4 max-h-40 overflow-y-scroll">
                {filterOptions[key].map((item) => (
                  <div className="flex items-center" key={item._id}>
                    <input
                      type="checkbox"
                      value={item?._id}
                      id={`checkbox-${item?._id}`}
                      onChange={(e) => handleFilter(key, e.target)}
                      className="mr-2"
                    />
                    <label htmlFor={`checkbox-${item?._id}`}>
                      {item?.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Filter;

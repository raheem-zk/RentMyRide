import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { carOwnerAxios } from "../../axios/axios";
import Dropdown from "../dropdown";
import AddingForm from "./addingForm";
import { MdArrowBack } from "react-icons/md";
import {
  addBrand,
  addCategory,
  addFueltype,
  addModel,
  addTransmission,
  verifiyOwnerSignup,
} from "../../utils/carIteams";
import { ErrorMessage, isDateValid, successMessage } from "../../utils/utils";
import { CarDetailsModel } from "../../models/models";
import { useDispatch, useSelector } from "react-redux";
import { addCar, clearCarData } from "../../redux/carOwner/addCarSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Item {
  name: string;
  _id: string;
}

const AddCar = ({ next, HandlePage }: any) => {
  const [brand, setBrand] = useState<Item[]>([]);
  const [category, setCategory] = useState<Item[]>([]);
  const [model, setModel] = useState<Item[]>([]);
  const [transmission, setTransmission] = useState<Item[]>([]);
  const [fueltype, setFuelType] = useState<Item[]>([]);
  const [uploadedImages, setUploadedImages] = useState<any[]>([]);
  const { ownerData } = useSelector((state: any) => state.carOwnerSignup);
  const { carOwner, success } = useSelector((state: any) => state.carOwnerAuth);
  const [files, setFiles] = useState<any[] | any>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getDropdownItems();
  }, []);

  const dispatch = useDispatch();
  const currentYear = new Date().getFullYear();

  const handleReload = () => {
    getDropdownItems();
  };

  const onImageChange = (e: any) => {
    setFiles([...files, ...e.target.files]);
  };

  const uploadImages = async (images: any) => {
    if (!images || images.length === 0) return [];

    const url: string[] = [];

    const presetKey = import.meta.env.VITE_PRESETKEY;
    const cloudName = import.meta.env.VITE_CLOUD_NAME;

    try {
      for (let i = 0; i < images.length; i++) {
        const img = images[i];
        const formData = new FormData();
        formData.append("file", img);
        formData.append("upload_preset", presetKey);
        formData.append("cloud_name", cloudName);

        const response = await axios.post(
          import.meta.env.VITE_CLOUDINERY_API,
          formData
        );
        let urlData = response.data.url;
        url.push(urlData);
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      ErrorMessage(error?.response?.data?.message || "Image upload failed");
    }

    return url;
  };

  const getDropdownItems = async () => {
    try {
      const res = await carOwnerAxios.get("/add-car");
      console.log(res.data, "the drop down items ..");
      if (res.data.error) {
        ErrorMessage(res.data.error);
      }
      setBrand(res?.data?.brand || []);
      setCategory(res?.data?.category || []);
      setModel(res?.data?.model || []);
      setTransmission(res?.data?.transmission || []);
      setFuelType(res?.data?.fueltype || []);
    } catch (error) {
      console.error("Error fetching dropdown items:", error);
      ErrorMessage(
        error?.response?.data?.message || "Error fetching dropdown items"
      );
    }
  };

  const [carDetails, setCarDetails] = useState<CarDetailsModel>({
    ownerId: success ? carOwner._id : "",
    carName: "",
    images: "",
    brand: "",
    model: "",
    year: "",
    licensePlate: "",
    transmission: "",
    category: "",
    perDayPrice: "",
    description: "",
    fuelType: "",
    startDate: "",
    endDate: "",
  });

  const handleCarDetailsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCarDetails({
      ...carDetails,
      [name]: value,
    });
  };

  useEffect(() => {
    if (uploadedImages.length > 0) {
      setCarDetails({
        ...carDetails,
        images: [...uploadedImages],
      });
      setUploadedImages([]);
    }
    // console.log(uploadedImages, "useEffect log ", carDetails);
  }, [uploadedImages, carDetails]);

  const uploadCarDetails = async () => {
    await carOwnerAxios.post("/add-car", carDetails);
    successMessage('Car Added successfully')
    dispatch(clearCarData());
    navigate("/car-owner/dashboard");
    return;
  };

  const uploadRegisterTime = async () => {
    const result = await verifiyOwnerSignup({
      email: ownerData.email,
      phoneNumber: ownerData.phoneNumber,
    });
    if (result) {
      next();
    }
  };

  useEffect(() => {
    if (carDetails.images.length !== 0 && success) {
      dispatch(addCar(carDetails));
      uploadCarDetails();
    } else if (carDetails.images.length !== 0 && !success) {
      dispatch(addCar(carDetails));
      uploadRegisterTime();
    }
  }, [carDetails]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(carDetails);

    const {
      carName,
      brand,
      model,
      year,
      licensePlate,
      transmission,
      category,
      description,
      fuelType,
      startDate,
      endDate,
      perDayPrice,
      images,
    } = carDetails;

    if (
      carName.trim() === "" ||
      brand.trim() === "" ||
      model.trim() === "" ||
      year.trim() === "" ||
      licensePlate.trim() === "" ||
      transmission.trim() === "" ||
      category === "add" ||
      description.trim() === "" ||
      fuelType === "add" ||
      startDate.trim() === "" ||
      endDate.trim() === ""
    ) {
      return ErrorMessage("Please fill in all fields");
    }

    if (year.length !== 4 || parseInt(year) > currentYear) {
      return ErrorMessage(
        "Car year is not correct. Please enter a valid 4-digit year before the current year."
      );
    }
    if (
      category === "add" ||
      brand === "add" ||
      model === "add" ||
      fuelType === "add" ||
      transmission === "add"
    ) {
      return ErrorMessage("Please select required data");
    }
    if (!isDateValid(startDate, endDate)) {
      return ErrorMessage("Please enter valid start and end dates");
    }
    if (parseInt(perDayPrice) > 25000 || parseInt(perDayPrice) < 300) {
      return ErrorMessage("The amount is not correct, please check");
    }
    if (files.length < 4 || files.length > 5) {
      return ErrorMessage("Image minimum is 4 and maximum is 5");
    }
    const uploadedUrls = await uploadImages(files);
    setUploadedImages(uploadedUrls);
  };

  return (
    <div className="flex-1 flex items-center justify-center p-5">
      <ToastContainer />
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold">Add Your Car Details</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <div>
              <label
                htmlFor="carName"
                className="block text-sm font-medium text-gray-700 mt-2"
              >
                Car Name
              </label>
              <input
                id="carName"
                name="carName"
                type="text"
                autoComplete="carName"
                required
                value={carDetails.carName}
                onChange={handleCarDetailsChange}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Car Name"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                {/* Brand */}
                <Dropdown
                  Reload={handleReload}
                  data={brand}
                  title={"brand"}
                  AddingForm={AddingForm}
                  handleCarDetailsChange={handleCarDetailsChange}
                  HandleForm={addBrand}
                />
              </div>
              <div>
                {/* Model */}
                <Dropdown
                  Reload={handleReload}
                  data={model}
                  title={"model"}
                  AddingForm={AddingForm}
                  handleCarDetailsChange={handleCarDetailsChange}
                  HandleForm={addModel}
                />
              </div>
              <div>
                {/* Transmission */}
                <Dropdown
                  Reload={handleReload}
                  data={transmission}
                  title={"transmission"}
                  AddingForm={AddingForm}
                  handleCarDetailsChange={handleCarDetailsChange}
                  HandleForm={addTransmission}
                />
              </div>
              <div>
                {/* Category */}
                <Dropdown
                  Reload={handleReload}
                  data={category}
                  title={"category"}
                  AddingForm={AddingForm}
                  handleCarDetailsChange={handleCarDetailsChange}
                  HandleForm={addCategory}
                />
              </div>
            </div>
            <div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  {/* Fuel Type */}
                  <Dropdown
                    Reload={handleReload}
                    data={fueltype}
                    title={"fuelType"}
                    AddingForm={AddingForm}
                    handleCarDetailsChange={handleCarDetailsChange}
                    HandleForm={addFueltype}
                  />
                </div>
                <div>
                  <label
                    htmlFor="endDate"
                    className="block text-sm font-medium text-gray-700 mt-2"
                  >
                    Year
                  </label>
                  <input
                    id="year"
                    name="year"
                    type="number"
                    autoComplete="year"
                    required
                    value={carDetails.year}
                    onChange={handleCarDetailsChange}
                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="2023"
                  />
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="carName"
                className="block text-sm font-medium text-gray-700 mt-2"
              >
                License Plate
              </label>
              <input
                id="licensePlate"
                name="licensePlate"
                type="text"
                autoComplete="licensePlate"
                required
                max={10}
                value={carDetails.licensePlate}
                onChange={handleCarDetailsChange}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="KL10AA9100"
              />
            </div>
            <div>
              <label
                htmlFor="carName"
                className="block text-sm font-medium text-gray-700 mt-2"
              >
                Per Day Price
              </label>
              <input
                id="perDayPrice"
                name="perDayPrice"
                type="number"
                min={300}
                max={25000}
                autoComplete="perDayPrice"
                required
                value={carDetails.perDayPrice}
                onChange={handleCarDetailsChange}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="300"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                {/* Start Date */}
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium text-gray-700 mt-2"
                >
                  Start Date
                </label>
                <input
                  id="startDate"
                  name="startDate"
                  required
                  type="date"
                  value={carDetails.startDate}
                  onChange={handleCarDetailsChange}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
              </div>
              <div>
                {/* End Date */}
                <label
                  htmlFor="endDate"
                  className="block text-sm font-medium text-gray-700 mt-2"
                >
                  End Date
                </label>
                <input
                  id="endDate"
                  name="endDate"
                  required
                  type="date"
                  value={carDetails.endDate}
                  onChange={handleCarDetailsChange}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700 mt-2"
              >
                Car Best Images (4-5 images)
              </label>
              <div className="mt-1 flex items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 15v23a1 1 0 001 1h30a1 1 0 001-1V15"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M24 15l-4 4m0 0l-4-4m4 4v18"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>Upload up to 5 files</span>
                      <input
                        id="file-upload"
                        name="image"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={onImageChange}
                        multiple
                        min={4}
                        max={5}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB each
                  </p>
                </div>
              </div>
            </div>

            {files &&
              files.map((image, index) => (
                <img
                  key={index}
                  className="w-auto py-2"
                  src={URL.createObjectURL(image)}
                  alt="posts"
                />
              ))}
            <div>
              <label
                htmlFor="carName"
                className="block text-sm font-medium text-gray-700 mt-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                required
                maxLength={500}
                value={carDetails.description}
                onChange={handleCarDetailsChange}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Description"
              />
            </div>
          </div>
          {HandlePage && (
            <div className="flex cursor-pointer" onClick={HandlePage}>
              <span>
                <MdArrowBack size={25} />
              </span>
              <span className="">Back</span>
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-400 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            >
              Upload
            </button>
            <div className="text-sm md:flex md:justify-between mt-2"></div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCar;

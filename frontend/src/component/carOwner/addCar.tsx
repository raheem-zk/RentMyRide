import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { ToastContainer } from "react-toastify";
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
import { CarDetailsModel, filterOptionsDatas } from "../../models/models";
import { useDispatch, useSelector } from "react-redux";
import { addCar, clearCarData } from "../../redux/carOwner/addCarSlice";
import { useNavigate } from "react-router-dom";
import { BsFillTrashFill } from "react-icons/bs";
import {
  getCarModels,
  uploadCar,
  uploadCarImage,
  uploadeEditCar,
} from "../../api/carOwnerApi";
import dayjs from "dayjs";

interface Item {
  name: string;
  _id: string;
}

const AddCar = ({ next, HandlePage, header, editCarData }: any) => {
  const [brand, setBrand] = useState<Item[]>([]);
  const [category, setCategory] = useState<Item[]>([]);
  const [model, setModel] = useState<Item[]>([]);
  const [transmission, setTransmission] = useState<Item[]>([]);
  const [fueltype, setFuelType] = useState<Item[]>([]);
  const [uploadedImages, setUploadedImages] = useState<any[]>([]);
  const { ownerData } = useSelector((state: any) => state.carOwnerSignup);
  const { carOwner, success } = useSelector((state: any) => state.carOwnerAuth);
  const [files, setFiles] = useState<any[] | any>([]);
  const [submit, setSubmit] = useState(false);
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

  const deleteImage = (imageToDelete) => {
    const updatedFiles = files.filter((image) => image !== imageToDelete);
    setFiles(updatedFiles);
    successMessage('Image has been successfully deleted')
  };

  const deleteEditImage = (imageToDelete) => {
    const updatedFiles = carDetails.images.filter(
      (image) => image !== imageToDelete
    );
    setCarDetails({
      ...carDetails,
      images: [...updatedFiles],
    });
    successMessage('Image has been successfully deleted')
  };

  const uploadImages = async (images: any) => {
    if (!images || images.length === 0) return [];
    const url: string[] = [];

    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      const data = await uploadCarImage(img);
      url.push(data);
    }
    return url;
  };

  const getDropdownItems = async () => {
    const data: filterOptionsDatas = await getCarModels();

    setBrand(data?.brand || []);
    setCategory(data?.category || []);
    setModel(data?.model || []);
    setTransmission(data?.transmission || []);
    setFuelType(data?.fuelType || []);
  };

  const [carDetails, setCarDetails] = useState<CarDetailsModel>({
    _id: "",
    ownerId: success ? carOwner : null,
    carName: "",
    images: [],
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
    if (editCarData) {
      setCarDetails({
        ...carDetails,
        _id: editCarData?._id,
        ownerId: success ? carOwner._id : "",
        carName: editCarData.carName || "",
        images: editCarData.images || [],
        brand: editCarData.brand || "",
        model: editCarData.model || "",
        year: editCarData.year || "",
        licensePlate: editCarData.licensePlate || "",
        transmission: editCarData.transmission || "",
        category: editCarData.category || "",
        perDayPrice: editCarData.perDayPrice || "",
        description: editCarData.description || "",
        fuelType: editCarData.fuelType || "",
        startDate:
          dayjs(editCarData?.startDate).format("YYYY-MM-DD") || "2023-10-31",
        endDate:
          dayjs(editCarData?.endDate).format("YYYY-MM-DD") || "2023-10-31",
      });
    }
  }, [editCarData]);

  useEffect(() => {
    if (uploadedImages.length > 0) {
      setCarDetails({
        ...carDetails,
        images: [...carDetails.images, ...uploadedImages],
      });
      setFiles([]);
      setUploadedImages([]);
      setSubmit(true);
    }
  }, [uploadedImages, carDetails]);

  const updateCarDetails = async () => {
    await uploadeEditCar(editCarData._id, carDetails);
    successMessage("Car Updated successfully");
    navigate("/car-owner/cars");
    return;
  };

  const uploadCarDetails = async () => {
    await uploadCar(carDetails);
    successMessage("Car successfully added to your account");
    dispatch(clearCarData());
    navigate("/car-owner/cars");
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
    if (
      carDetails.images.length !== 0 &&
      !editCarData &&
      success &&
      submit === true
    ) {
      // add car
      dispatch(addCar(carDetails));
      uploadCarDetails();
    } else if (
      carDetails.images.length !== 0 &&
      !success &&
      !editCarData &&
      submit === true
    ) {
      // register time add car
      dispatch(addCar(carDetails));
      uploadRegisterTime();
    } else if (
      carDetails.images.length !== 0 &&
      header &&
      editCarData &&
      submit === true
    ) {
      // edit car
      updateCarDetails();
    }
    setSubmit(false);
  }, [carDetails, submit]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

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
      year.trim() === "" ||
      licensePlate.trim() === "" ||
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
    if ((images.length === 0 && files.length < 4) || files.length > 5) {
      return ErrorMessage("Image minimum is 4 and maximum is 5");
    } else if (
      (images.length !== 0 && files.length + images.length > 5) ||
      files.length + images.length < 4
    ) {
      return ErrorMessage("Image minimum is 4 and maximum is 5");
    }

    const uploadedUrls = files.length !== 0 ? await uploadImages(files) : null;
    if (uploadedUrls) {
      setUploadedImages(uploadedUrls);
    } else {
      setSubmit(true);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-5">
      <ToastContainer />
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold">
            {header ? header : "Add Your Car Details"}
          </h2>
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
                  value={editCarData?.brand}
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
                  value={editCarData?.model}
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
                  value={editCarData?.transmission}
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
                  value={editCarData?.category}
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
                    value={editCarData?.fuelType}
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
                <>
                  <div key={index + 2} className="image-container relative">
                    <img
                      key={index}
                      className="w-auto py-2"
                      src={URL.createObjectURL(image)}
                      alt="posts"
                    />
                    <span
                      onClick={(e) => deleteImage(image)}
                      className="delete-button absolute top-0 right-0 p-2 cursor-pointer bg-white border border-gray-300 rounded-full"
                    >
                      <BsFillTrashFill />
                    </span>
                  </div>
                </>
              ))}
            {carDetails.images &&
              carDetails.images.map((image, index) => (
                <>
                  <div key={index + 2} className="image-container relative">
                    <img
                      key={index}
                      className="w-auto py-2"
                      src={image}
                      alt="posts"
                    />
                    <span
                      onClick={(e) => deleteEditImage(image)}
                      className="delete-button absolute top-0 right-0 p-2 cursor-pointer bg-white border border-gray-300 rounded-full"
                    >
                      <BsFillTrashFill />
                    </span>
                  </div>
                </>
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

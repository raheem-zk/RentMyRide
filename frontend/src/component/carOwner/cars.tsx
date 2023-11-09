import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit } from "react-icons/fi";
import { AiOutlineFundView } from "react-icons/ai";
import { addOwnerCars } from "../../redux/carOwner/carsSlice";
import { getOwnerCarsAPI } from "../../api/carOwnerApi";
import Loading from "../loading";
import Pagination from "../pagination";

const OwnerCars = () => {
  const [cars, setCars] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(1);
  const dispatch = useDispatch();
  const { carOwner } = useSelector((state: any) => state.carOwnerAuth);
  useEffect(() => {
    getCars(page);
  }, [page]);

  const getCars = async (page) => {
    const ownerId: string = carOwner._id;
    const { carsData, size } = await getOwnerCarsAPI(ownerId, page);

    dispatch(addOwnerCars(carsData));
    setCars(carsData);
    setSize(size);
  };

  const filterPageination = (number) => {
    setPage(number);
  };

  return !cars ? (
    <Loading />
  ) : (
    <div className="container mx-auto px-4 py-8 max-h-screen">
      <h2 className="text-3xl font-bold mb-4">My Cars</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cars.map((car) => (
          <div key={car?._id} className="bg-white rounded shadow p-4">
            <img
              src={car?.images[0]}
              alt=""
              className="w-full h-48 object-cover"
            />
            <h3 className="text-xl font-bold mb-2">
              {car?.brand?.name} {car?.model?.name}
            </h3>
            <p className="text-gray-600 mb-2">Year: {car?.year}</p>
            <p className="text-gray-600 mb-2">
              Availability: {car?.availability}
            </p>
            <p className="text-gray-600 mb-2">
              License Plate: {car?.licensePlate}
            </p>
            <div className="flex space-x-2">
              <Link to={`/car-owner/edit-car/${car?._id}`}>
                <FiEdit className="text-2xl text-green-600" />
              </Link>
              <Link to={`/car-owner/car-details/${car?._id}`}>
                <AiOutlineFundView className="text-2xl text-blue-600" />
              </Link>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={page}
        size={size}
        filterPagination={filterPageination}
      />
    </div>
  );
};

export default OwnerCars;

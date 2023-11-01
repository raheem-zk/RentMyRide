import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import TabelFrame from "./tabelFrame";
import { handleAction } from "../../utils/carIteams";

const OwnerMoreDetails = () => {
  const { ownerId } = useParams();
  const { owner } = useSelector((state: any) => state.carownersList);
  const data = owner.find((owner) => owner._id === ownerId);

  if (!data) {
    return <div>Owner not found</div>;
  }

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Owner Details</h1>
        <div className="bg-white rounded shadow p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <strong>First Name:</strong> {data.firstName}
            </div>
            <div>
              <strong>Last Name:</strong> {data.lastName}
            </div>
            <div>
              <strong>Email:</strong> {data.email}
            </div>
            <div>
              <strong>Phone Number:</strong> {data.phoneNumber}
            </div>
            <div>
              <strong>Place:</strong> {data.place}
            </div>
            <div>
              <strong>Age:</strong> {data.age}
            </div>
            <div>
              <strong>Address:</strong> {data.address}
            </div>
            <div>
              <strong>License:</strong> {data.license}
            </div>
          </div>
          <div className="mt-4">
            <strong>Profile Picture:</strong>
            {data.profilePicture ? (
              <img
                src={data.profilePicture}
                alt="Profile"
                className="w-24 h-24 mt-2 rounded-full"
              />
            ) : (
              <div className="text-red-800 font-bold mt-2">Not Updated</div>
            )}
          </div>
          <div className="mt-4">
            <strong>Created At:</strong>{" "}
            {new Date(data.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
      <div className="container mx-auto p-4">
        <TabelFrame
          heading={`Cars of ${data.firstName} ${data.lastName}`}
          data={data.carId}
          handleAction={handleAction}
          role="cars"
          filterPagination={(val)=>val }
          currentPage={1}
          size={1}
        />
      </div>
    </>
  );
};

export default OwnerMoreDetails;

import React from "react";
import { Link, useRouteError } from "react-router-dom";

const ErrorPage = ({path}) => {
  const error = useRouteError();
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-purple-600">
        <div id="error-page">
          <h1 className="lg:text-6xl font-bold text-2xl text-white">Oops!</h1>
          <p className="text-xl text-white">
            Sorry, an unexpected error has occurred.
          </p>
          <p className="text-3xl text-white">
            {error.statusText || error.message}
          </p>
          <div className="mt-4">
            <Link
              to={path}
              className="px-5 py-2 bg-white rounded-md hover:bg-gray-100"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <h2 className="text-2xl text-gray-600 mt-2">Page Not Found</h2>
      <p className="text-gray-500 mt-4">
        Oops! The page you are looking for does not exist.
      </p>
      <Link to="/" className="mt-6 px-6 py-3 bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-800 transition">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;

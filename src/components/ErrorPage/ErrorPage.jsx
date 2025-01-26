import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-black bg-opacity-70 p-10 text-white text-center rounded-lg shadow-xl">
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Oops! Page Not Found</h2>
        <p className="mb-6">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/" className="btn bg-[#2c3792] text-white px-6 py-3 flex items-center justify-center rounded-lg shadow-lg hover:bg-blue-700">
          <FaHome className="mr-2 text-lg" />
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;

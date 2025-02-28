import React, { useContext } from "react";
import { FaLocationArrow } from "react-icons/fa";
import {
  FaLocationCrosshairs,
  FaLocationPin,
  FaMapLocation,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../provider/ThemeProvider";

const ScholarshipCard = ({ scholarship }) => {
  const { theme } = useContext(ThemeContext);
  const {
    scholarshipName,
    universityName,
    universityImage,
    universityCountry,
    universityCity,
    subjectCategory,
    scholarshipCategory,
    applicationFees,
    applicationDeadline,
    rating,
    ScholarshipDescription,
    _id,
  } = scholarship;

  return (
    <div
      className={`border rounded-lg shadow-2xl overflow-hidden  ${
        theme === "dark" ? "bg-black text-white" : ""
      }`}
    >
      <div className="flex justify-center pt-3 ">
        <img
          src={universityImage}
          alt={universityName}
          className="w-60 border-2 h-36 "
        />
      </div>

      <div className="p-4">
        <h2
          className={` font-semibold  mb-1 ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}
        >
          {universityName}
        </h2>

        <p
          className={`text-base line-clamp-1 ${
            theme === "dark" ? "text-white " : "text-gray-500"
          }`}
        >
          {scholarshipName}
        </p>

        <p
          className={`mt-2 text-sm  flex items-center gap-2 ${
            theme === "dark" ? "text-white " : "text-gray-600"
          }`}
        >
          <FaMapLocation></FaMapLocation> {universityCity},{universityCountry}
        </p>

        {/* <p className="text-gray-600 text-base  ">
          <strong>Scholarship Description:</strong>
        </p> */}
        <p className="text-justify line-clamp-4 mt-1">
          {ScholarshipDescription}
        </p>

        {rating && (
          <p className="text-gray-600 text-base">
            <strong>Rating:</strong> {rating.toFixed(1)} / 5
          </p>
        )}

        <div className="mt-4">
          <Link to={`/scholarshipDetails/${_id}`}>
            {" "}
            <button className="w-full bg-[#2c3792] text-white py-2 px-4 rounded-md hover:bg-gray-300 hover:text-black transition">
              View Scholarship Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipCard;

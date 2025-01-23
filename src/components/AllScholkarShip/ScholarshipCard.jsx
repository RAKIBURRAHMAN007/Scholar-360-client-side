import React from "react";
import { Link } from "react-router-dom";

const ScholarshipCard = ({ scholarship }) => {
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
        _id
    } = scholarship;

    return (
        <div className=" border rounded-lg shadow-2xl overflow-hidden bg-white">

            <div className="flex justify-center pt-3 ">
                <img
                    src={universityImage}
                    alt={universityName}
                    className="w-60 border-2 h-40 "
                />
            </div>

            <div className="p-4">

                <h2 className=" font-semibold text-gray-800 mb-1">
                    {universityName}
                </h2>

                <p className="text-base line-clamp-1 text-gray-500">{scholarshipName}</p>


                <p className="mt-2 text-sm text-gray-600 ">
                    <strong className="text-base">Location:</strong> {universityCity},{universityCountry}
                </p>


                <p className="text-gray-600 text-base">
                    <strong>Scholarship Category:</strong> {scholarshipCategory}
                </p>


                <p className="text-gray-600 text-base">
                    <strong>Subject:</strong> {subjectCategory}
                </p>


                <p className="text-gray-600 text-base">
                    <strong>Deadline:</strong> {applicationDeadline}
                </p>


                <p className="text-gray-600 text-base">
                    <strong>Application Fees:</strong> ${applicationFees}
                </p>


                {rating && (
                    <p className="text-gray-600 text-base">
                        <strong>Rating:</strong> {rating.toFixed(1)} / 5
                    </p>
                )}


                <div className="mt-4">
                    <Link to={`/scholarshipDetails/${_id}`}> <button className="w-full bg-[#2c3792] text-white py-2 px-4 rounded-md hover:bg-gray-300 hover:text-black transition">
                        View Scholarship Details
                    </button></Link>
                </div>
            </div>
        </div>
    );
};

export default ScholarshipCard;

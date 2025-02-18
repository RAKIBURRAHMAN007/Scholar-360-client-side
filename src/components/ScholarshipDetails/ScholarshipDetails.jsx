import { useQuery } from "@tanstack/react-query";
import React from "react";
import UseAxiosPublic from "../../hooks/UseAxiosPublic";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const ScholarshipDetails = () => {
  const { id } = useParams();
  const axiosPublic = UseAxiosPublic();

  const { data: Scholarship = {} } = useQuery({
    queryKey: ["Scholarship", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/allScholarships/${id}`);
      return res.data;
    },
  });

  const { data: reviews = [] } = useQuery({
    queryKey: ["Reviews", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/reviews/${id}`);
      return res.data;
    },
  });

  return (
    <div className="w-11/12 mx-auto mt-28 mb-16">
      {/* Scholarship Details */}
      <div className="text-center mb-8">
        <img
          src={Scholarship.universityImage}
          alt={Scholarship.universityName}
          className="mx-auto w-36 h-36 border mb-4"
        />
        <h1 className="text-3xl font-bold">{Scholarship.scholarshipName}</h1>
        <p className="text-xl font-semibold text-gray-600">
          {Scholarship.universityName}
        </p>
        <p className="text-lg text-gray-500">
          {Scholarship.universityCity}, {Scholarship.universityCountry}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left border-r border-gray-300">
                Field
              </th>
              <th className="py-2 px-4 text-left">Details</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2 px-4 font-semibold border-r border-gray-300">
                Scholarship Category
              </td>
              <td className="py-2 px-4">{Scholarship.scholarshipCategory}</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 px-4 font-semibold border-r border-gray-300">
                Subject Category
              </td>
              <td className="py-2 px-4">{Scholarship.subjectCategory}</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 px-4 font-semibold border-r border-gray-300">
                Degree
              </td>
              <td className="py-2 px-4">{Scholarship.degree}</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 px-4 font-semibold border-r border-gray-300">
                Tuition Fees
              </td>
              <td className="py-2 px-4">${Scholarship.tuitionFees}</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 px-4 font-semibold border-r border-gray-300">
                Application Deadline
              </td>
              <td className="py-2 px-4">{Scholarship.applicationDeadline}</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 px-4 font-semibold border-r border-gray-300">
                Service Charge
              </td>
              <td className="py-2 px-4">${Scholarship.serviceCharge}</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 px-4 font-semibold border-r border-gray-300">
                Application Fees
              </td>
              <td className="py-2 px-4">${Scholarship.applicationFees}</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 px-4 font-semibold border-r border-gray-300">
                Post Date
              </td>
              <td className="py-2 px-4">{Scholarship.scholarshipPostDate}</td>
            </tr>
          </tbody>
        </table>
        <br />
        <div>
          <p className="py-2 px-4 text-2xl font-semibold  border-gray-300">
            Description
          </p>
          <p className="py-2 px-4 text-justify">
            {Scholarship.ScholarshipDescription}
          </p>
        </div>
      </div>

      {/* Reviews Section */}
      {reviews.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">User Reviews</h2>
          <Swiper
            modules={[Pagination, Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            className="w-full max-w-2xl mx-auto"
          >
            {reviews.map((review) => (
              <SwiperSlide
                key={review._id}
                className="p-4 bg-gray-100 rounded-lg shadow"
              >
                <div className="flex items-center gap-4 mb-2">
                  <img
                    src={review.userImage}
                    alt={review.userName}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="text-lg font-semibold">{review.userName}</h4>
                    <p className="text-sm text-gray-500">{review.date}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  Rating: {review.rating} ⭐
                </p>
                <p className="text-gray-800 mt-2">{review.comment}</p>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* Apply Button */}
      <div className="mt-8 flex justify-center">
        <Link
          to={`/payment/${id}`}
          className="px-6 py-3 bg-[#2c3792] text-white rounded-lg text-lg font-semibold hover:bg-blue-700"
        >
          Apply for Scholarship
        </Link>
      </div>
    </div>
  );
};

export default ScholarshipDetails;

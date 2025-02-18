import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "../../hooks/UseAxiosPublic";
import ScholarshipCard from "./ScholarshipCard";

const AllScholarShip = () => {
  const axiosPublic = UseAxiosPublic();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [searchTerm, setSearchTerm] = useState("");

  const { data: allScholarships = [] } = useQuery({
    queryKey: ["allScholarships"],
    queryFn: async () => {
      const res = await axiosPublic.get("/allScholarships");
      return res.data;
    },
  });

  const totalPages = Math.ceil(allScholarships.length / itemsPerPage);

  const filteredScholarships = allScholarships.filter((scholarship) => {
    const { scholarshipName, universityName, degreeName } = scholarship;
    return (
      (scholarshipName &&
        scholarshipName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (universityName &&
        universityName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (degreeName &&
        degreeName.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const paginatedScholarships = filteredScholarships.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.search.value.trim().toLowerCase());
  };

  const pageButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    pageButtons.push(
      <button
        key={i}
        className={`px-4 py-2 rounded-md ${
          currentPage === i
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-700"
        }`}
        onClick={() => handlePageChange(i)}
      >
        {i}
      </button>
    );
  }

  return (
    <div className="w-11/12 mx-auto mt-28 mb-20">
      <h1 className="text-center font-bold md:text-3xl mb-5 text-xl text-[#2c3792]">
        Explore Prestigious Scholarships <br /> Worldwide
      </h1>
      <p className="text-center mb-10">
        "Discover prestigious scholarships from top universities around the
        globe. Explore opportunities to achieve{" "}
        <br className="md:block hidden" /> your academic dreams with funding
        options tailored to your aspirations!"
      </p>

      <div className="flex justify-center mb-8">
        <form onSubmit={handleSearch} className="flex  gap-4">
          <input
            className="pl-4 border rounded-md"
            placeholder="University,Scholarship Name, Degree"
            type="text"
            name="search"
          />
          <button
            type="submit"
            className="bg-[#2c3792] text-white px-4 py-2 rounded-md"
          >
            Search
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-4">
        {paginatedScholarships.length > 0 ? (
          paginatedScholarships.map((scholarship) => (
            <ScholarshipCard key={scholarship._id} scholarship={scholarship} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-3">
            No scholarships found.
          </p>
        )}
      </div>

      <div className="mt-8 flex justify-center gap-2">{pageButtons}</div>
    </div>
  );
};

export default AllScholarShip;

import React from 'react';
import CountUp from 'react-countup';
import { FaUniversity, FaBook, FaFeatherAlt, FaGraduationCap } from 'react-icons/fa';

const CountUpStat = () => {
  const stats = [
    { icon: <FaUniversity />, value: 207, label: "UNIVERSITY" },
    { icon: <FaBook />, value: 40091, label: "EDUCATION PROGRAM" },
    { icon: <FaFeatherAlt />, value: 15472, label: "Scholarship GRANTEES" },
    { icon: <FaGraduationCap />, value: 150000, label: "ALUMNI" },
  ];

  return (
    <div className="bg-[#2c3792] w-11/12 mx-auto text-white py-10">
      <div className="flex flex-wrap justify-around gap-10">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center w-full sm:w-1/2 md:w-1/5"
          >
            <div className="text-5xl mb-4">{stat.icon}</div>
            <h2 className="text-3xl font-bold">
              <CountUp start={0} end={stat.value} duration={2.5} separator="," />
            </h2>
            <p className="text-lg mt-2">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountUpStat;

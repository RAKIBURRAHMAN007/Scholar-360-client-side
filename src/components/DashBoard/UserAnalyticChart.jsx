import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import { Bar } from "react-chartjs-2";
import bg from "../../assets/img/9082953.jpg";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { AuthContext } from "../../provider/AuthProvider";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const UserAnalyticChart = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = useContext(AuthContext);

  if (!user) {
    return <p>User is not authenticated</p>;
  }

  const { data: userStats = {}, isLoading } = useQuery({
    queryKey: ["user-stats", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user-stats/${user.email}`);
      return res.data;
    },
  });
  console.log(userStats);
  // // Loading state
  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }

  // Bar chart data setup
  const barData = {
    labels: ["Applications", "Reviews"],
    datasets: [
      {
        label: "Counts",
        data: [userStats.applicationsCount, userStats.reviewsCount],
        backgroundColor: ["#ff6384", "#36a2eb"],
      },
    ],
  };

  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"></div>

      <div className="relative z-10">
        <div className="w-11/12 py-7 mx-auto">
          <h2 className="text-3xl md:ml-0 ml-2 text-white font-bold mb-6 text-center">
            Analytics
          </h2>
          <div className="md:w-1/2 mx-auto">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h3 className="text-lg font-medium mb-4">Counts Overview</h3>
              <Bar data={barData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAnalyticChart;

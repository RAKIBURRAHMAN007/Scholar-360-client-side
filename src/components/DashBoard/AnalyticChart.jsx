import React from 'react';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';
import { Bar, Pie } from 'react-chartjs-2';
import bg from '../../assets/img/9082953.jpg'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const AnalyticChart = () => {
    const axiosSecure = UseAxiosSecure();
    const { data: adminStats = {}, isLoading } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        },
    });
   
    if (isLoading) {
        return <p>Loading...</p>;
    }

    
    const barData = {
        labels: ['Users', 'Scholarships', 'Applications', 'Reviews'],
        datasets: [
            {
                label: 'Counts',
                data: [
                    adminStats.users,
                    adminStats.scholarships,
                    adminStats.applications,
                    adminStats.reviews,
                ],
                backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0'],
            },
        ],
    };

    

    return (
        <div className='min-h-screen  relative '
            style={{
                backgroundImage: `url(${bg})`,
            
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',

            }}>
            <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"></div>

            <div className="relative z-10  ">
                <div className=''>
                    <div className="w-11/12 py-7 mx-auto">
                        <h2 className="text-3xl md:ml-0 ml-2 text-white font-bold mb-6 text-center">Analytics</h2>
                        <div className="md:w-1/2 mx-auto">
                            
                            <div className="bg-white p-4 rounded-lg shadow-lg">
                                <h3 className="text-lg font-medium mb-4">Counts Overview</h3>
                                <Bar data={barData} />
                            </div>

                        </div>
                    </div>
                </div>
            </div>



        </div>
    );
};

export default AnalyticChart;

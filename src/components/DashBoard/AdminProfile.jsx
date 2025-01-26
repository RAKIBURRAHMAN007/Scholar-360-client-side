import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import bg from '../../assets/img/9082953.jpg'

const AdminProfile = () => {
    const { user, logOut } = useContext(AuthContext);
    const axiosSecure = UseAxiosSecure()
    const { data: adminData = [] } = useQuery({
        queryKey: ['adminData'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`)
            return res.data;
        }
    })
    return (
        <div className='h-screen relative p-2 '
            style={{
                backgroundImage: `url(${bg})`,
                width: "full",
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',

            }}>
            <div className="absolute inset-0  bg-black bg-opacity-40 backdrop-blur-sm">
                <div className='relative z-10  '>
                    <h1 className='mb-10 text-center mt-20  text-white font-bold text-xl md:text-3xl'>Welcome, {adminData.displayName}! <br /> Let’s lead the way.</h1>
                    <div className=''>

                        <div className="max-w-sm md:max-w-lg mx-auto  text-white rounded-lg shadow-lg p-6 text-center ">

                            <img
                                src={user.photoURL}
                                alt={adminData.displayName || 'Admin Profile'}
                                className="w-24 h-24 mx-auto rounded-full mb-4 border-2 border-gray-300"
                            />

                            <h1 className="text-xl font-semibold  mb-2">{adminData.displayName || 'N/A'}</h1>
                            <p className="text-sm ">
                                <span className="font-medium">Email:</span> {adminData.email || 'N/A'}
                            </p>
                            <p className="text-sm ">
                                <span className="font-medium">Role:</span> {adminData.role || 'N/A'}
                            </p>
                        </div>
                        <div className='flex justify-center mt-9'>
                            <Link onClick={logOut} className="text-white">
                                <button className="btn text-white bg-[#2c3792] md:w-40 border-white hover:text-black">Logout</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>



        </div>

    );
};

export default AdminProfile;
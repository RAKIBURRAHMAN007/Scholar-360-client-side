import React, { useContext } from 'react';
import bg from '../../assets/img/9082953.jpg';
import { AuthContext } from '../../provider/AuthProvider';

const DashBoardHome = () => {
    const { user } = useContext(AuthContext);

    return (
        <div
            className="min-h-screen relative"
            style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"></div>
            <div className="relative z-10 flex items-center justify-center h-full">
                <div className=" text-white rounded-lg mt-20 shadow-xl p-6 w-96 text-center">
                    {/* Display user image */}
                    {user?.photoURL ? (
                        <img
                            src={user.photoURL}
                            alt="User Avatar"
                            className="w-24 h-24 rounded-full mx-auto mb-4"
                        />
                    ) : (
                        <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500">No Image</span>
                        </div>
                    )}

                    {/* Display user name */}
                    <h1 className="text-2xl font-bold ">
                        {user?.displayName || 'User Name'}
                    </h1>

                    {/* Additional Information */}
                    <p className=" mt-2">
                        Welcome to your dashboard, {user?.displayName || 'User'}!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DashBoardHome;

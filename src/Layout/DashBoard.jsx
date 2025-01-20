import React, { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { FaBars, FaClipboardCheck, FaClipboardList, FaHome, FaPlus, FaStar, FaTasks, FaUser, FaUsers } from 'react-icons/fa';

const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    return (
        <div className="dashboard-container flex">
            {/* Sidebar Toggle Button */}
            <button
                onClick={toggleSidebar}
                className="p-3 bg-gray-800 text-white fixed top-4 left-4 z-50 rounded-full"
            >
                <FaBars size={24} /> {/* Menu icon */}
            </button>

            {/* Sidebar */}
            <div
                className={`fixed top-0 z-20 left-0 h-full bg-[#2c3792] text-white w-64 transition-transform overflow-y-auto transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <h2 className="text-2xl font-semibold mt-12 p-4">Dashboard Overview</h2>
                <ul className="mt-4 ">

                    {/* user links */}
                    <li className='p-2 '>
                        <NavLink
                            className={({ isActive }) =>
                                `flex items-center justify-start p-1 hover:bg-black  gap-2 ${isActive ? 'font-extrabold text-yellow-500 ' : 'text-white'}`
                            }
                            to="/dashboard/myProfile"
                        >
                            <FaUser /> My Profile
                        </NavLink>
                    </li>

                    <li className='p-2 '>
                        <NavLink
                            className={({ isActive }) =>
                                `flex items-center justify-start p-1 hover:bg-black gap-2 ${isActive ? 'font-extrabold text-yellow-500 ' : 'text-white'}`
                            }
                            to="/dashboard/myApplication"
                        >
                            <FaClipboardList /> My Application
                        </NavLink>
                    </li>

                    <li className='p-2 '>
                        <NavLink
                            className={({ isActive }) =>
                                `flex items-center p-1  justify-start hover:bg-black gap-2 ${isActive ? 'font-extrabold text-yellow-500 ' : 'text-white'}`
                            }
                            to="/dashboard/myReviews"
                        >
                            <FaStar /> My Reviews
                        </NavLink>
                    </li>
                    <li className='p-2 '>
                        <NavLink
                            className={({ isActive }) =>
                                `flex items-center p-1  justify-start hover:bg-black gap-2 ${isActive ? 'font-extrabold text-yellow-500 ' : 'text-white'}`
                            }
                            to="/"
                        >
                            <FaHome></FaHome> Home
                        </NavLink>
                    </li>
                    <div className='divider'></div>
                    {/* admin links */}
                    <li className='p-2 '>
                        <NavLink
                            className={({ isActive }) =>
                                `flex items-center p-1 justify-start hover:bg-black gap-2 ${isActive ? 'font-extrabold text-yellow-500 ' : 'text-white'}`
                            }
                            to="/dashboard/adminProfile"
                        >
                            <FaUser /> Admin Profile
                        </NavLink>
                    </li>
                    <li className='p-2 '>
                        <NavLink
                            className={({ isActive }) =>
                                `flex items-center p-1 justify-start hover:bg-black gap-2 ${isActive ? 'font-extrabold text-yellow-500 ' : 'text-white'}`
                            }
                            to="/dashboard/addScholarship"
                        >
                            <FaPlus /> Add Scholarship
                        </NavLink>
                    </li>
                    <li className='p-2 '>
                        <NavLink
                            className={({ isActive }) =>
                                `flex items-center p-1 justify-start hover:bg-black gap-2 ${isActive ? 'font-extrabold text-yellow-500 ' : 'text-white'}`
                            }
                            to="/dashboard/manageScholarships"
                        >
                            <FaTasks /> Manage Scholarships
                        </NavLink>
                    </li>
                    <li className='p-2 '>
                        <NavLink
                            className={({ isActive }) =>
                                `flex items-center p-1 justify-start hover:bg-black gap-2 ${isActive ? 'font-extrabold text-yellow-500 ' : 'text-white'}`
                            }
                            to="/dashboard/manageApplications"
                        >
                            <FaClipboardCheck /> Manage Applied Applications
                        </NavLink>
                    </li>
                    <li className='p-2 '>
                        <NavLink
                            className={({ isActive }) =>
                                `flex items-center p-1 justify-start hover:bg-black gap-2 ${isActive ? 'font-extrabold text-yellow-500 ' : 'text-white'}`
                            }
                            to="/dashboard/manageUsers"
                        >
                            <FaUsers /> Manage Users
                        </NavLink>
                    </li>
                    <li className='p-2 '>
                        <NavLink
                            className={({ isActive }) =>
                                `flex items-center p-1 justify-start hover:bg-black gap-2 ${isActive ? 'font-extrabold text-yellow-500 ' : 'text-white'}`
                            }
                            to="/dashboard/manageReviews"
                        >
                            <FaStar /> Manage Reviews
                        </NavLink>
                    </li>

                    {/* moderator links */}
                    {/* Moderator Links */}
                    <div className='divider'></div>
                    <li className='p-2 '>
                        <NavLink
                            className={({ isActive }) =>
                                `flex items-center p-1 justify-start hover:bg-black gap-2 ${isActive ? 'font-extrabold text-yellow-500 ' : 'text-white'}`
                            }
                            to="/dashboard/myProfile"
                        >
                            <FaUser /> My Profile
                        </NavLink>
                    </li>
                    <li className='p-2 '>
                        <NavLink
                            className={({ isActive }) =>
                                `flex items-center p-1 justify-start hover:bg-black gap-2 ${isActive ? 'font-extrabold text-yellow-500 ' : 'text-white'}`
                            }
                            to="/dashboard/manageScholarships"
                        >
                            <FaTasks /> Manage Scholarships
                        </NavLink>
                    </li>
                    <li className='p-2 '>
                        <NavLink
                            className={({ isActive }) =>
                                `flex items-center p-1 justify-start hover:bg-black gap-2 ${isActive ? 'font-extrabold text-yellow-500 ' : 'text-white'}`
                            }
                            to="/dashboard/allReviews"
                        >
                            <FaStar /> All Reviews
                        </NavLink>
                    </li>
                    <li className='p-2 '>
                        <NavLink
                            className={({ isActive }) =>
                                `flex items-center p-1 justify-start hover:bg-black gap-2 ${isActive ? 'font-extrabold text-yellow-500 ' : 'text-white'}`
                            }
                            to="/dashboard/allAppliedScholarships"
                        >
                            <FaClipboardCheck /> All Applied Scholarships
                        </NavLink>
                    </li>
                    <li className='p-2 '>
                        <NavLink
                            className={({ isActive }) =>
                                `flex items-center p-1 justify-start hover:bg-black gap-2 ${isActive ? 'font-extrabold text-yellow-500 ' : 'text-white'}`
                            }
                            to="/dashboard/addScholarship"
                        >
                            <FaPlus /> Add Scholarship
                        </NavLink>
                    </li>



                </ul>
            </div>

            {/* Main Content Area */}
            <div
                className={`main-content flex-1 p-6  transition-transform ${isSidebarOpen ? '' : ''
                    }`}
            >
                <h1 className="text-3xl font-semibold mb-6 ml-12">Dashboard</h1>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;

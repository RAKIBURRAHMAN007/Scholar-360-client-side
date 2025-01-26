import React, { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { FaBars, FaClipboardCheck, FaClipboardList, FaHome, FaPlus, FaStar, FaTasks, FaTimes, FaUser, FaUsers } from 'react-icons/fa';
import UseAdmin from '../hooks/UseAdmin';
import UseModerator from '../hooks/UseModerator';
import { FaHouseMedicalCircleExclamation, FaHouseTsunami } from 'react-icons/fa6';

const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isAdmin, isAdminLoading] = UseAdmin();
    const [isModerator, isModeratorLoading] = UseModerator();
    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    return (
        <div className="dashboard-container flex">
            {/* Sidebar Toggle Button */}
            <div>
                <button
                    onClick={toggleSidebar}
                    className="p-3 bg-[#1d0153] border text-white fixed top-4 left-4 z-50 rounded-full"
                >
                    {isSidebarOpen ? <FaTimes size={35} /> : <FaBars size={35} />}

                </button>
            </div>



            {/* Sidebar */}
            <div
                className={`fixed top-0 z-20 left-0 h-full bg-[#1d0153]  border-r-4 backdrop-blur-2xl text-white w-64 transition-transform overflow-y-auto transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <h2 className="text-xl font-semibold mt-28 p-4">Dashboard Overview</h2>
                <ul className="mt-2 ">


                    {/* user links */}
                    {
                        !isAdmin && !isModerator && (
                            <>
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
                            </>
                        )
                    }

                    {/* admin links */}
                    {
                        isAdmin && (
                            <>
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
                            </>
                        )
                    }

                    {/* Moderator Links */}

                    {
                        isModerator && (
                            <>
                                <li className='p-2 '>
                                    <NavLink
                                        className={({ isActive }) =>
                                            `flex items-center p-1 justify-start hover:bg-black gap-2 ${isActive ? 'font-extrabold text-yellow-500 ' : 'text-white'}`
                                        }
                                        to="/dashboard/adminProfile"
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
                                        to="/dashboard/manageReviews"
                                    >
                                        <FaStar /> All Reviews
                                    </NavLink>
                                </li>
                                <li className='p-2 '>
                                    <NavLink
                                        className={({ isActive }) =>
                                            `flex items-center p-1 justify-start hover:bg-black gap-2 ${isActive ? 'font-extrabold text-yellow-500 ' : 'text-white'}`
                                        }
                                        to="/dashboard/manageApplications"
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
                                <li className='p-2 '>
                                    <NavLink
                                        className={({ isActive }) =>
                                            `flex items-center p-1  justify-start hover:bg-black gap-2 ${isActive ? 'font-extrabold text-yellow-500 ' : 'text-white'}`
                                        }
                                        to="/"
                                    >
                                        <FaHome></FaHome>Home
                                    </NavLink>
                                </li>
                            </>

                        )
                    }


                    {/* common link */}
                    <li className='p-2 '>
                        <NavLink
                            className={({ isActive }) =>
                                `flex items-center p-1  justify-start hover:bg-black gap-2 ${isActive ? 'font-extrabold text-yellow-500 ' : 'text-white'}`
                            }
                            to="/dashboard/dashBoardHome"
                        >
                            <FaHouseTsunami></FaHouseTsunami> DashBoard Root
                        </NavLink>
                    </li>


                </ul>
            </div>

            {/* Main Content Area */}
            <div
                className={`main-content  transition-transform w-full `}
            >

                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;

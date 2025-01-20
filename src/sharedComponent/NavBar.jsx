import React, { useContext } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

import logo from '../assets/img/1.png'
import { AuthContext } from '../provider/AuthProvider';
const NavBar = () => {
    const { logOut, user } = useContext(AuthContext);
    const location = useLocation();

    const links = (
        <>
            <li>
                <NavLink
                    to="/"
                    style={({ isActive, isPending, isTransitioning }) => {
                        return {
                          fontWeight: isActive ? "bold" : "",
                          
                          backgroundColor: isActive ? '#2c3792' : '',
                          color: isPending ? "red" : "",
                          viewTransitionName: isTransitioning ? "slide" : "",
                        };
                      }}
                    className=" hover:text-[#2c3792]  p-2 rounded font-medium hover:font-bold"
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/allScholarship"
                    style={({ isActive, isPending, isTransitioning }) => {
                        return {
                          fontWeight: isActive ? "bold" : "",
                          
                          backgroundColor: isActive ? '#2c3792' : '',
                          color: isPending ? "red" : "",
                          viewTransitionName: isTransitioning ? "slide" : "",
                        };
                      }}
                    className=" hover:text-[#2c3792] p-2 rounded font-medium hover:font-bold"
                >
                    All Scholarship
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/dashboard"
                    style={({ isActive, isPending, isTransitioning }) => {
                        return {
                          fontWeight: isActive ? "bold" : "",
                          
                          backgroundColor: isActive ? '#2c3792' : '',
                          color: isPending ? "red" : "",
                          viewTransitionName: isTransitioning ? "slide" : "",
                        };
                      }}
                    className=" hover:text-[#2c3792] p-2 rounded font-medium hover:font-bold"
                >
                    Dashboard
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/aboutUs"
                    style={({ isActive, isPending, isTransitioning }) => {
                        return {
                          fontWeight: isActive ? "bold" : "",
                          
                          backgroundColor: isActive ? '#2c3792' : '',
                          color: isPending ? "red" : "",
                          viewTransitionName: isTransitioning ? "slide" : "",
                        };
                      }}
                    className=" hover:text-[#2c3792] font-medium hover:font-bold p-2 rounded"
                >
                    About-Us
                </NavLink>
            </li>
        </>
    );


    return (
        <div className="navbar fixed z-20 bg-white bg-opacity-50   " >
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost  lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-blue-800 text-white rounded-box  z-50 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <a className="btn btn-ghost text-base md:text-2xl  text-white">
                    <img className='w-14 md:w-24' src={logo} alt="" />
                </a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1  text-xl">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                {user ? (
                    <div className="flex gap-1 items-center">
                        <div className="w-10 rounded-full border bg-[#2c3792]  ">
                            <img className="rounded-full p-1" src={user.photoURL} alt="" />
                        </div>
                        <Link onClick={logOut} className="text-white">
                            <button className="btn text-white bg-[#2c3792]  border-white hover:text-black">Logout</button>
                        </Link>
                    </div>
                ) : (
                    <Link to="/login" className="text-white">
                        <button className="btn text-white bg-[#2c3792]  border-white hover:text-black">Login</button>
                    </Link>
                )}
            </div>

        </div>
    );
};

export default NavBar;

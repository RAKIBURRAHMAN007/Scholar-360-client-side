import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/UseAxiosSecure';
import { FaTrashAlt, FaUserAlt, FaUserCircle, FaUsers } from 'react-icons/fa';
import Swal from 'sweetalert2';
import bg from '../../assets/img/9082953.jpg';

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedRole, setSelectedRole] = useState('all'); // State to store selected role for filtering

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const handleFilterChange = (e) => {
        setSelectedRole(e.target.value); // Update the selected role
    };

    const filteredUsers = selectedRole === 'all'
        ? users
        : users.filter(user => user.role === selectedRole); // Filter users by selected role

    const handleMakeAdmin = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to make this user Admin!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Do it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/admin/${user._id}`).then(res => {
                    if (res.data.modifiedCount > 0) {
                        refetch();
                        Swal.fire({
                            position: "top-center",
                            icon: "success",
                            title: `${user.displayName} is an Admin Now!`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                });
            }
        });
    };

    const handleMakeModerator = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to make this user Moderator!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Do it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/moderator/${user._id}`).then(res => {
                    if (res.data.modifiedCount > 0) {
                        refetch();
                        Swal.fire({
                            position: "top-center",
                            icon: "success",
                            title: `${user.displayName} is a Moderator Now!`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                });
            }
        });
    };

    const handleMakeUser = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to make this user Regular User!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Do it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/user/${user._id}`).then(res => {
                    if (res.data.modifiedCount > 0) {
                        refetch();
                        Swal.fire({
                            position: "top-center",
                            icon: "success",
                            title: `${user.displayName} is a Regular User Now!`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                });
            }
        });
    };

    const handleDeleteUser = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this user!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`).then(res => {
                    if (res.data.deletedCount > 0) {
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "User has been deleted.",
                            icon: "success"
                        });
                    }
                });
            }
        });
    };

    return (
        <div className='min-h-screen  relative'
            style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: 'cover',

                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}>
            <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"></div>
            <div className="relative z-10  ">
                <div className=''>
                    <h1 className='font-bold text-center md:text-3xl py-5 text-xl text-white'>
                        Manage Users ({filteredUsers.length})
                    </h1>
                    <div className="flex justify-end items-center w-11/12 mx-auto">


                        <select
                            className="select select-bordered w-48"
                            value={selectedRole}
                            onChange={handleFilterChange}
                        >
                            <option value="all">All Roles</option>
                            <option value="admin">Admin</option>
                            <option value="moderator">Moderator</option>
                            <option value="user">User</option>
                        </select>
                    </div>
                    <div className='w-11/12 mx-auto text-white mt-10 rounded-lg shadow-lg'>
                        <div className="overflow-x-auto">
                            <table className="table  w-full">
                                <thead className='bg-white text-black'>
                                    <tr>
                                        <th></th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Make Admin</th>
                                        <th>Make Moderator</th>
                                        <th>Make Regular User</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map((user, index) => (
                                        <tr key={user._id}>
                                            <th>{index + 1}</th>
                                            <td>{user.displayName}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                {user.role === 'admin' ? 'Admin' : (
                                                    <button
                                                        onClick={() => handleMakeAdmin(user)}
                                                        className="btn btn-md bg-[#2c3792]">
                                                        <FaUsers className="text-white text-xl" />
                                                    </button>
                                                )}
                                            </td>
                                            <td>
                                                {user.role === 'moderator' ? 'Moderator' : (
                                                    <button
                                                        onClick={() => handleMakeModerator(user)}
                                                        className="btn btn-md bg-[#53577d]">
                                                        <FaUserCircle className="text-white text-xl" />
                                                    </button>
                                                )}
                                            </td>
                                            <td>
                                                {user.role === 'user' ? 'User' : (
                                                    <button
                                                        onClick={() => handleMakeUser(user)}
                                                        className="btn btn-md bg-[#191a27]">
                                                        <FaUserAlt className="text-white text-xl" />
                                                    </button>
                                                )}
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() => handleDeleteUser(user)}
                                                    className="btn btn-ghost btn-lg">
                                                    <FaTrashAlt className="text-red-600" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;

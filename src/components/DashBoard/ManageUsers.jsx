import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../hooks/UseAxiosSecure';
import { FaTrashAlt, FaUserAlt, FaUserCircle, FaUsers } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure()
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data;


        }
    })

    const handleMakeAdmin = user => {
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

                axiosSecure.patch(`/users/admin/${user._id}`)
                    .then(res => {
                        console.log(res.data)
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
                    })
            }
        });


    }
    const handleMakeModerator = user => {
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

                axiosSecure.patch(`/users/moderator/${user._id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                position: "top-center",
                                icon: "success",
                                title: `${user.displayName} is an Moderator Now!`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })
            }
        });


    }
    const handleMakeUser = user => {
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

                axiosSecure.patch(`/users/user/${user._id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                position: "top-center",
                                icon: "success",
                                title: `${user.displayName} is an Normal User Now!`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })
            }
        });

    }

    const handleDeleteUser = user => {
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

                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "User has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }
    return (
        <div>
            <h1 className='text-center font-bold md:text-3xl mb-10 text-xl text-[#2c3792]'>Manage Users ({users.length})</h1>
            <div className="overflow-x-auto">
                <table className="table  table-zebra w-full">
                    {/* head */}
                    <thead>
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
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.displayName}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.role === 'admin' ? 'Admin' : <button
                                        onClick={() => handleMakeAdmin(user)}
                                        className="btn btn-md bg-[#2c3792]">
                                        <FaUsers className="text-white 
                                        text-xl"></FaUsers>
                                    </button>}
                                </td>
                                <td>
                                    {user.role === 'moderator' ? 'Moderator' : <button
                                        onClick={() => handleMakeModerator(user)}
                                        className="btn btn-md bg-[#53577d]">
                                        <FaUserCircle className="text-white 
                                        text-xl"></FaUserCircle>
                                    </button>}
                                </td>
                                <td>
                                    {user.role === 'user' ? 'User' : <button
                                        onClick={() => handleMakeUser(user)}
                                        className="btn btn-md bg-[#191a27]">
                                        <FaUserAlt className="text-white 
                                        text-xl"></FaUserAlt>
                                    </button>}
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDeleteUser(user)}
                                        className="btn btn-ghost btn-lg">
                                        <FaTrashAlt className="text-red-600"></FaTrashAlt>
                                    </button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default ManageUsers;
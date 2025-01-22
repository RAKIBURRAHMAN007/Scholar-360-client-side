import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaRegEdit, FaRegTrashAlt, FaEye } from 'react-icons/fa'; // Import React Icons
import UseAxiosSecure from '../../hooks/UseAxiosSecure';
import bg from '../../assets/img/9082953.jpg'
import Swal from 'sweetalert2';
const ManageScholarship = () => {
    const axiosSecure = UseAxiosSecure();
    const { data: Scholarships = [], refetch } = useQuery({
        queryKey: ['Scholarships'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allScholarship');
            return res.data;
        },
    });
    const handleCancel = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/allScholarship/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "The Scholarship has been deleted.",
                                icon: "success"
                            });

                        }
                    })



            }
        });

    }

    return (
        <div
            className="relative min-h-screen p-2"
            style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}
        >

            <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"></div>


            <div className="relative z-10">
                <h1 className="text-center text-white font-bold text-xl md:text-5xl pt-3 mb-3">
                    Manage Scholarship
                </h1>

                <div className="md:w-11/12  mx-auto bg-white mt-10  rounded-lg shadow-lg">
                    <div>
                        <div className="overflow-x-auto">
                            <table className="table">

                                <thead>
                                    <tr>
                                        <th>
                                            <label>
                                                <input type="checkbox" className="checkbox" />
                                            </label>
                                        </th>
                                        <th>Scholarship Name</th>
                                        <th>University Name</th>
                                        <th>Subject Category</th>
                                        <th>Degree</th>
                                        <th>Application Fees</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Map through the scholarship data */}
                                    {Scholarships.map((scholarship) => (
                                        <tr key={scholarship._id}>
                                            <th>
                                                <label>
                                                    <input type="checkbox" className="checkbox" />
                                                </label>
                                            </th>
                                            <td>{scholarship.scholarshipName}</td>
                                            <td>{scholarship.universityName}</td>
                                            <td>{scholarship.subjectCategory}</td>
                                            <td>{scholarship.degree}</td>
                                            <td>${scholarship.applicationFees}</td>
                                            <td className='flex flex-col gap-2 '>
                                                {/* Action Buttons */}
                                                <button className="flex gap-1 justify-center items-center rounded-md  bg-blue-400 btn-ghost btn-sm ">
                                                    <FaEye /> Details
                                                </button>
                                                <button className="flex gap-1 justify-center items-center rounded-md  bg-yellow-300 btn-ghost btn-sm">
                                                    <FaRegEdit /> Edit
                                                </button>
                                                <button onClick={() => handleCancel(scholarship._id)} className="flex gap-1 justify-center items-center rounded-md   btn-ghost bg-red-500 btn-sm">
                                                    <FaRegTrashAlt /> Cancel
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

export default ManageScholarship;

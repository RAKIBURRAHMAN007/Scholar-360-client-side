import React, { useState } from 'react';
import bg from '../../assets/img/9082953.jpg';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const ManageReviews = () => {
    const axiosSecure = UseAxiosSecure();


    // Fetch all reviews
    const { data: allReviews = [], refetch } = useQuery({
        queryKey: ['allReviews'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allReviews');

            return res.data;
        },
    });


    const handleDelete = (reviewId) => {
        console.log(reviewId)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this Review!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/allReviews/delete/${reviewId}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Review has been deleted.",
                                icon: "success"
                            });
                        }
                    });
            }
        });

    };

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
            <div className="relative z-10">
                <div className="w-11/12 mx-auto py-10">
                    <h1 className="text-white text-3xl font-bold text-center mb-8">
                        Manage Reviews
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {allReviews.map((review) => (
                            <div
                                key={review.id}
                                className="bg-white rounded-lg shadow-lg p-6"
                            >
                                <div className="flex items-center mb-4">
                                    <img
                                        src={review.userImage}

                                        className="w-12 h-12 rounded-full mr-4"
                                    />
                                    <div>
                                        <h3 className="font-bold text-lg">
                                            {review.userName}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            {new Date(
                                                review.date
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <h4 className="font-semibold text-lg mb-2">
                                    {review.universityName}
                                </h4>
                                <p className="text-sm text-gray-700 mb-4">
                                    {review.subjectCategory}
                                </p>
                                <p className="text-sm text-gray-600 mb-4">
                                    {review.comment}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-yellow-500 font-bold">
                                        Rating: {review.rating}
                                    </span>
                                    <button
                                        onClick={() => handleDelete(review._id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageReviews;

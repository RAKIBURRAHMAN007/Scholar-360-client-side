import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';
import { AuthContext } from '../../provider/AuthProvider';
import bg from "../../assets/img/9082953.jpg";
import Swal from 'sweetalert2';

const MyReviews = () => {
    const axiosSecure = UseAxiosSecure();
    const { user } = useContext(AuthContext);
    const { data: reviews = [], refetch } = useQuery({
        queryKey: ['user.email', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/userReviews/${user.email}`);
            return res.data;
        },
    });

    const [editingReview, setEditingReview] = useState(false);
    const [editedData, setEditedData] = useState([]);

    const handleDelete = async (id) => {
        const confirmed = await Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        });

        if (confirmed.isConfirmed) {
            await axiosSecure.delete(`/userReviews/delete/${id}`)
                .then(res => {
                    if (res.data.deletedCount > 0) {
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "'Deleted!', 'Your review has been deleted.', 'success'",
                            icon: "success"
                        });
                    }
                });

        };
    }

    const handleEdit = (review) => {
        setEditedData(review);
        setEditingReview(true)

    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const updatedReview = {
            rating: e.target.rating.value,
            comment: e.target.comment.value,
        };

        try {
            const response = await axiosSecure.patch(`/userReviews/update/${editedData._id}`, updatedReview);
            if (response.data.modifiedCount > 0) {
                Swal.fire({
                    title: 'Updated!',
                    text: 'Your review has been updated successfully.',
                    icon: 'success',
                });
                refetch(); // Refresh the reviews list
                setEditingReview(false); // Close the modal
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Failed to update your review. Please try again.',
                icon: 'error',
            });
        }
    };


    return (
        <div
            className="min-h-screen  relative"
            style={{
                backgroundImage: `url(${bg})`,

                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}
        >   <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"></div>
            <div className=" relative z-10 ">
                <div className="w-11/12 mx-auto py-7">
                    <div className="p-4">
                        <h1 className="text-white text-2xl text-center mb-4">My Reviews</h1>
                        <div className="overflow-x-auto">
                            <table className="min-w-full table-auto text-white">
                                <thead>
                                    <tr className="bg-white text-black">
                                        <th className="py-2 px-4">Scholarship Name</th>
                                        <th className="py-2 px-4">University Name</th>
                                        <th className="py-2 px-4">Comments</th>
                                        <th className="py-2 px-4">Date</th>
                                        <th className="py-2 px-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reviews.map(review => (
                                        <tr key={review._id} className="border-b border-gray-700">
                                            <td className="py-2 px-4">{review.scholarshipName}</td>
                                            <td className="py-2 px-4">{review.universityName}</td>
                                            <td className="py-2 px-4">{review.comment}</td>
                                            <td className="py-2 px-4">{new Date(review.date).toLocaleDateString()}</td>
                                            <td className="py-2 px-4 flex gap-2">
                                                <button
                                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                                    onClick={() => handleDelete(review._id)}
                                                >
                                                    Delete
                                                </button>
                                                <button
                                                    className="bg-blue-500 text-white px-3 py-1 rounded"
                                                    onClick={() => handleEdit(review)}
                                                >
                                                    Edit
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

            {/* Edit Modal */}
            {editingReview && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl mb-4">Edit Review</h2>
                        <form onSubmit={handleEditSubmit}>
                            <div className="mb-4">
                                <label className="block mb-1">Rating</label>
                                <input
                                    type="number"
                                    name="rating"
                                    min="1"
                                    max="5"
                                    defaultValue={editedData.rating}
                                    required
                                    className="w-full border border-gray-300 p-2 rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Comments</label>
                                <textarea
                                    name="comment"
                                    defaultValue={editedData.comment}
                                    required
                                    className="w-full p-2 border rounded"
                                ></textarea>
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    className="bg-gray-500 text-white px-3 py-1 rounded"
                                    onClick={() => setEditingReview(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white px-3 py-1 rounded"
                                >
                                    Save
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            )}
        </div>
    );
};

export default MyReviews;

import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';
import { AuthContext } from '../../provider/AuthProvider';
import Swal from 'sweetalert2';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

const MyApplication = () => {
    const axiosSecure = UseAxiosSecure();
    const { user } = useContext(AuthContext);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedScholarship, setSelectedScholarship] = useState(null);

    const { data: appliedApplication = [], refetch } = useQuery({
        queryKey: ['appliedScholarships', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/appliedScholarships/${user.email}`);
            return res.data;
        },
    });



    const handleEdit = (status) => {
        if (status === 'pending') {
            Swal.fire('Edit functionality goes here');

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Cannot Edit',
                text: 'You can only edit applications with a pending status.',
            });

        }
    };

    const handleCancel = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, cancel it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/appliedScholarships/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Canceled!",
                                text: "The Application has been cancelled.",
                                icon: "success"
                            });
                        }
                    });
            }
        });
    };

    const handleAddReview = (scholarship) => {
        setSelectedScholarship(scholarship);
        setModalIsOpen(true);
    };

    const submitReview = (e) => {
        e.preventDefault();
        const form = e.target;
        const review = {
            rating: form.rating.value,
            comment: form.comment.value,
            date: new Date().toLocaleDateString(),
            scholarshipName: selectedScholarship.scholarshipName,
            universityName: selectedScholarship.universityName,
            universityId: selectedScholarship.universityId,
            userName: user.displayName,
            userEmail: user.email,
            userImage: user.photoURL || '',
        };

        axiosSecure.post('/addReview', review).then(() => {
            Swal.fire('Review Submitted!', 'Your review has been added.', 'success');
            setModalIsOpen(false);
        });
    };

    return (
        <div className="p-6 mt-16">
            <h1 className="text-2xl font-bold mb-6">My Applications</h1>
            <div className='overflow-x-auto'>
                <table className="min-w-full table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-2">University Name</th>
                            <th className="border border-gray-300 p-2">University Address</th>
                            <th className="border border-gray-300 p-2">Feedback</th>
                            <th className="border border-gray-300 p-2">Subject Category</th>
                            <th className="border border-gray-300 p-2">Applied Degree</th>
                            <th className="border border-gray-300 p-2">Application Fees</th>
                            <th className="border border-gray-300 p-2">Service Charge</th>
                            <th className="border border-gray-300 p-2">Status</th>
                            <th className="border border-gray-300 p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appliedApplication.map((application) => (
                            <tr key={application.id}>
                                <td className="border border-gray-300 p-2">{application.universityName}</td>
                                <td className="border border-gray-300 p-2">{application.universityAddress}</td>
                                <td className="border border-gray-300 p-2">{application.feedback || 'No feedback yet'}</td>
                                <td className="border border-gray-300 p-2">{application.subjectCategory}</td>
                                <td className="border border-gray-300 p-2">{application.degree}</td>
                                <td className="border border-gray-300 p-2">${application.applicationFees}</td>
                                <td className="border border-gray-300 p-2">${application.serviceCharge}</td>
                                <td className="border border-gray-300 p-2">{application.Status}</td>
                                <td className="border border-gray-300 p-2 flex flex-col gap-2">
                                    <Link className="bg-blue-500 text-white px-2 py-1 rounded" to={`/scholarshipDetails/${application.scholarshipId}`}><button

                                        
                                    >
                                        Details
                                    </button></Link>
                                    <button
                                        onClick={() => handleEdit(application.Status)}
                                        className="bg-green-500 text-white px-2 py-1 rounded"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleCancel(application._id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => handleAddReview(application)}
                                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                                    >
                                        Add Review
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                <h2 className="text-xl font-bold mb-4">Add Review</h2>
                <form onSubmit={submitReview}>
                    <div className="mb-4">
                        <label className="block mb-1">Rating</label>
                        <input
                            type="number"
                            name="rating"
                            min="1"
                            max="5"
                            required
                            className="w-full border border-gray-300 p-2 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Comment</label>
                        <textarea
                            name="comment"
                            required
                            className="w-full border border-gray-300 p-2 rounded"
                        ></textarea>
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                        Submit Review
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default MyApplication;

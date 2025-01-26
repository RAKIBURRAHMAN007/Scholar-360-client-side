import React, { useState } from 'react';
import bg from '../../assets/img/9082953.jpg';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';
import Swal from 'sweetalert2';

const ManageAppliedScholarship = () => {
    const axiosSecure = UseAxiosSecure();

    // State for modals
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [SelectedApplicationFeedback, setSelectedApplicationFeedback] = useState(null);
    const [feedbackModal, setFeedbackModal] = useState(false);

    // State for sorting/filtering
    const [filterOption, setFilterOption] = useState('appliedDate');

    const { data: allAppliedScholarships = [], refetch } = useQuery({
        queryKey: ['allAppliedScholarships', filterOption],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allAppliedScholarship?sortBy=${filterOption}`);
            return res.data;
        },
    });

    // Handlers
    const handleCancelApplication = (id) => {
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
                const Status = 'rejected';
                axiosSecure.patch(`/appliedScholarshipStatus/${id}`, { Status })
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                position: "top-center",
                                icon: "success",
                                title: `Cancelled & status changed! `,
                                showConfirmButton: false,
                                timer: 1500
                            });

                        }
                    });

            }
        });
    };

    const handleFeedbackSubmit = (e) => {
        e.preventDefault();
        const feedback = e.target.feedback.value;
        axiosSecure.patch(`/appliedScholarshipFeedback/${SelectedApplicationFeedback._id}`, { feedback })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: `Feedback submitted successfully! `,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setFeedbackModal(false);
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
            <div className="absolute inset-0  bg-opacity-50 backdrop-blur-md"></div>
            <div className="relative z-10">
                <div className="w-11/12 mx-auto">
                    <h1 className="text-white text-xl md:text-3xl font-bold py-7 text-center">Manage Applied <br /> Scholarships</h1>

                    {/* Sorting/Filtering Dropdown */}
                    <div className="flex justify-center mb-4">
                        <select
                            value={filterOption}
                            onChange={(e) => setFilterOption(e.target.value)}
                            className="bg-gray-800 text-white px-4 py-2 rounded"
                        >
                            <option value="applicationDate">Sort by Applied Date</option>
                            <option value="deadLine">Sort by Scholarship Deadline</option>
                        </select>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="table-auto w-full text-left text-white">
                            <thead>
                                <tr className="bg-white text-black">
                                    <th className="px-4 py-2">#</th>
                                    <th className="px-4 py-2">Scholarship Name</th>
                                    <th className="px-4 py-2">Degree</th>
                                    <th className="px-4 py-2">Category</th>
                                    <th className="px-4 py-2">Status</th>
                                    <th className="px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allAppliedScholarships.map((application, index) => (
                                    <tr key={application._id} className="border-b hover:bg-gray-600">
                                        <td className="px-4 py-2">{index + 1}</td>
                                        <td className="px-4 py-2">{application.scholarshipName}</td>
                                        <td className="px-4 py-2">{application.degree}</td>
                                        <td className="px-4 py-2">{application.scholarshipCategory}</td>
                                        <td className="px-4 py-2 capitalize">{application.Status}</td>
                                        <td className="px-4 py-2 flex space-x-3">
                                            {/* Details Button */}
                                            <button
                                                onClick={() => setSelectedApplication(application)}
                                                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500"
                                            >
                                                Details
                                            </button>
                                            {/* Feedback Button */}
                                            <button
                                                onClick={() => {
                                                    setSelectedApplicationFeedback(application);
                                                    setFeedbackModal(true);
                                                }}
                                                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-400"
                                            >
                                                Feedback
                                            </button>
                                            {/* Cancel Button */}
                                            <button
                                                onClick={() => handleCancelApplication(application._id)}
                                                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500"
                                            >
                                                Cancel
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Details Modal */}
            {selectedApplication && (
                <div className="fixed inset-0 z-30 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 w-96">
                        <h2 className="text-2xl font-bold mb-4">Application Details</h2>
                        <p><strong>University:</strong> {selectedApplication.universityName}</p>
                        <p><strong>Degree:</strong> {selectedApplication.degree}</p>
                        <p><strong>Category:</strong> {selectedApplication.scholarshipCategory}</p>
                        <p><strong>Applicant Name:</strong> {selectedApplication.userName}</p>
                        <p><strong>Applicant Mail:</strong> {selectedApplication.userMail}</p>
                        <p><strong>Ssc Result:</strong> {selectedApplication.sscResult}</p>
                        <p><strong>Hsc Result:</strong> {selectedApplication.hscResult}</p>
                        <button
                            className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400"
                            onClick={() => setSelectedApplication(null)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Feedback Modal */}
            {feedbackModal && (
                <div className="fixed inset-0 z-30 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 w-96">
                        <h2 className="text-2xl font-bold mb-4">Provide Feedback</h2>
                        <form onSubmit={handleFeedbackSubmit}>
                            <textarea
                                name="feedback" // Set name to extract value from the form
                                className="w-full border rounded-lg p-2"
                                placeholder="Enter feedback here"
                                required // Ensure feedback is entered
                            ></textarea>
                            <div className="flex justify-end mt-4">
                                <button
                                    type="button"
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400 mr-2"
                                    onClick={() => setFeedbackModal(false)} // Close the modal
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageAppliedScholarship;

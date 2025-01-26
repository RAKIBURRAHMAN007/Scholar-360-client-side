import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';
import { AuthContext } from '../../provider/AuthProvider';
import Swal from 'sweetalert2';
import bg from '../../assets/img/9082953.jpg'
import { Link } from 'react-router-dom';
const imgHostingKey = import.meta.env.VITE_imgHostingKey;
const imgHostingApi = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`
const MyApplication = () => {
    const axiosSecure = UseAxiosSecure();
    const { user } = useContext(AuthContext);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedScholarship, setSelectedScholarship] = useState(null);
    const [selectedEditScholarship, setSelectedEditScholarship] = useState(null);

    const [editModalOpen, setEditModalOpen] = useState(false)
    const { data: appliedApplication = [], refetch } = useQuery({
        queryKey: ['appliedScholarships', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/appliedScholarships/${user.email}`);
            return res.data;
        },
    });

    const handleEdit = (application) => {
        if (application.Status === 'pending') {
            setEditModalOpen(true)
            setSelectedEditScholarship(application)

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
            scholarshipId: selectedScholarship.scholarshipId,
            userName: user.displayName,
            userEmail: user.email,
            userImage: user.photoURL || '',
        };

        axiosSecure.post('/reviews', review)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        title: "Reviews Added!",
                        text: "The scholarship Review has been successfully added.",
                        icon: "success"
                    });
                }
            })
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;
        const imageFile = e.target.userImage.files[0];

        const updatedApplicationData = {
            phone: form.phone.value,
            photo: selectedEditScholarship.photo,
            address: form.address.value,
            gender: form.gender.value,
            degree: form.degree.value,
            sscResult: form.sscResult.value,
            hscResult: form.hscResult.value,
            studyGap: form.studyGap.value,
        };

        try {
            if (imageFile) {
                const formData = new FormData();
                formData.append('image', imageFile);

                // Uploading image to img hosting
                const imgResponse = await axiosPublic.post(imgHostingApi, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (imgResponse.data.success) {
                    updatedApplicationData.photo = imgResponse.data.data.display_url;
                } else {
                    console.error('Image upload failed:', imgResponse.data.error.message);
                }
            }

            // Prepare the updated application data


            console.log('Updated Application Data:', updatedApplicationData);

            // Send the update request
            const res = await axiosSecure.patch(`/appliedScholarships/${selectedEditScholarship._id}`, updatedApplicationData);

            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    title: "Application Updated!",
                    text: "Your application has been updated successfully.",
                    icon: "success",
                });
                setEditModalOpen(false); // Close the modal after successful update
                refetch(); // Refetch the data to reflect changes
            } else {
                Swal.fire({
                    title: "Error",
                    text: "There was an error updating the application.",
                    icon: "error",
                });
            }
        } catch (error) {
            console.error('Error during image upload or application update:', error.message);
        }
    };


    return (
        <div className='min-h-screen  '
            style={{
                backgroundImage: `url(${bg})`,
                width: "full",
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',

            }}>
            <div className=" bg-black bg-opacity-50 backdrop-blur-sm">
                <div className=' '>
                    <div className=" w-11/12 mx-auto py-8 text-white">
                        <h1 className="text-2xl text-center font-bold mb-6">My Applications</h1>
                        <div className='overflow-x-auto'>
                            <table className="min-w-full table-auto border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-100 text-black">
                                        <th className="border border-gray-300  p-2">University Name</th>
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
                                                <Link className="bg-blue-500 text-white px-2 py-1 rounded" to={`/scholarshipDetails/${application.scholarshipId}`}><button>Details</button></Link>
                                                <button
                                                    onClick={() => handleEdit(application)}
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

                        {/* Modal Implementation */}
                        {modalIsOpen && (
                            <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
                                <div className="bg-white w-96 text-black p-6 rounded-lg relative">
                                    <button
                                        onClick={() => setModalIsOpen(false)}
                                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
                                    >
                                        ✖
                                    </button>
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
                                </div>
                            </div>
                        )}
                        {editModalOpen && (
                            <div className="fixed inset-0 z-50 p-14  flex md:items-center bg-black bg-opacity-45 justify-center">
                                <div className="bg-white text-black overflow-y-auto max-h-[90vh] p-8 rounded-lg shadow-lg w-96">
                                    <button
                                        onClick={() => setEditModalOpen(false)}
                                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
                                    >
                                        ✖
                                    </button>
                                    <h2 className="text-xl font-bold mb-6 text-center">Applicant Information</h2>

                                    <form onSubmit={handleEditSubmit} className="space-y-4">
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text text-xl">Phone Number</span>
                                            </label>
                                            <input
                                                type="number"
                                                name="phone"
                                                defaultValue={selectedEditScholarship.phone}
                                                placeholder="Phone number"
                                                className="input input-bordered w-full"

                                            />
                                        </div>

                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text text-xl">Photo</span>
                                            </label>
                                            <input
                                                type="file"
                                                name="userImage"
                                                className="file-input file-input-bordered"

                                            />
                                        </div>

                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text text-xl">Address</span>
                                            </label>
                                            <textarea
                                                name="address"
                                                defaultValue={selectedEditScholarship.address}
                                                placeholder="Address (Village, District, Country)"
                                                className="textarea textarea-bordered w-full"

                                            />
                                        </div>

                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text text-xl">Gender</span>
                                            </label>
                                            <select
                                                name="gender"
                                                defaultValue={selectedEditScholarship.gender}

                                                className="select select-bordered w-full"

                                            >
                                                <option value="">Select Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </select>
                                        </div>

                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text text-xl">Degree</span>
                                            </label>
                                            <select
                                                name="degree"
                                                defaultValue={selectedEditScholarship.degree}
                                                className="select select-bordered w-full"

                                            >
                                                <option value="">Select Degree</option>
                                                <option value="Diploma">Diploma</option>
                                                <option value="Bachelor">Bachelor</option>
                                                <option value="Masters">Masters</option>
                                            </select>
                                        </div>

                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text text-xl">SSC Result</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="sscResult"
                                                defaultValue={selectedEditScholarship.sscResult}
                                                placeholder="SSC Result "
                                                className="input input-bordered w-full"

                                            />
                                        </div>

                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text text-xl">HSC Result</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="hscResult"
                                                defaultValue={selectedEditScholarship.hscResult}
                                                placeholder="HSC Result "
                                                className="input input-bordered w-full"

                                            />
                                        </div>

                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text text-xl">Study Gap</span>
                                            </label>
                                            <select
                                                name="studyGap"
                                                defaultValue={selectedEditScholarship.studyGap}
                                                className="select select-bordered w-full"
                                            >
                                                <option value="">Study Gap (optional)</option>
                                                <option value="1">1 years</option>
                                                <option value="2">2 year</option>
                                                <option value="3">3 years</option>
                                            </select>
                                        </div>







                                        <div className="form-control mt-6">
                                            <button className="btn btn-primary hover:bg-slate-500 bg-[#162e40] text-white w-full">
                                                Submit
                                            </button>
                                        </div>
                                    </form>


                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>



        </div>
    );
};

export default MyApplication;

import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { FaRegEdit, FaRegTrashAlt, FaEye } from 'react-icons/fa';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';
import bg from '../../assets/img/9082953.jpg';
import Swal from 'sweetalert2';
import UseAxiosPublic from '../../hooks/UseAxiosPublic';
import { AuthContext } from '../../provider/AuthProvider';
import { Link } from 'react-router-dom';
const imgHostingKey = import.meta.env.VITE_imgHostingKey;
const imgHostingApi = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`
const ManageScholarship = () => {
    const axiosPublic = UseAxiosPublic()
    const axiosSecure = UseAxiosSecure();
    const { user } = useContext(AuthContext)
    const { data: Scholarships = [], refetch } = useQuery({
        queryKey: ['Scholarships'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allScholarship');
            return res.data;
        },
    });

    // Modal state to control visibility and scholarship data
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedScholarship, setSelectedScholarship] = useState(null);

    // Handle modal open and pre-fill scholarship data
    const handleEdit = (scholarship) => {
        setSelectedScholarship(scholarship);
        setIsModalOpen(true);
    };

    // Handle form submission to update the scholarship

    const handleUpdateScholarship = async (e) => {
        e.preventDefault();
        const form = e.target;

        // Collect form data
        const imageFile = form.universityImage.files[0]; // File input
        const scholarshipData = {
            scholarshipName: form.scholarshipName.value,
            universityName: form.universityName.value,
            universityImage: selectedScholarship.imageUrl,
            universityCountry: form.universityCountry.value,
            universityCity: form.universityCity.value,
            universityWorldRank: form.universityWorldRank.value,
            subjectCategory: form.subjectCategory.value,
            scholarshipCategory: form.scholarshipCategory.value,
            degree: form.degree.value,
            tuitionFees: form.tuitionFees.value,
            applicationFees: form.applicationFees.value,
            serviceCharge: form.serviceCharge.value,
            applicationDeadline: form.applicationDeadline.value,
            scholarshipPostDate: form.scholarshipPostDate.value,
            ScholarshipDescription: form.ScholarshipDescription.value,
            email: user.email,

        };

        try {
            if (imageFile) {

                const formData = new FormData();
                formData.append('image', imageFile);

                const imgResponse = await axiosPublic.post(imgHostingApi, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (imgResponse.data.success) {
                    scholarshipData.universityImage = imgResponse.data.data.display_url;
                } else {
                    console.error('Image upload failed');
                    Swal.fire({
                        title: "Image Upload Failed",
                        text: "Please try again with a valid image.",
                        icon: "error",
                    });
                    return;
                }
            } else {

                scholarshipData.universityImage = selectedScholarship.universityImage;
            }


            const response = await axiosSecure.patch(
                `/allScholarship/${selectedScholarship._id}`,
                scholarshipData
            );

            if (response.data.modifiedCount > 0) {
                refetch();
                setIsModalOpen(false);
                Swal.fire({
                    title: "Scholarship Updated",
                    text: "The scholarship has been successfully updated.",
                    icon: "success",
                });
            } else {
                Swal.fire({
                    title: "No Changes Made",
                    text: "No updates were applied to the scholarship.",
                    icon: "info",
                });
            }
        } catch (error) {
            console.error('An error occurred while updating the scholarship:', error);
            Swal.fire({
                title: "Error",
                text: "An error occurred while updating the scholarship. Please try again later.",
                icon: "error",
            });
        }
    };


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
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "The Scholarship has been deleted.",
                                icon: "success"
                            });
                        }
                    });
            }
        });
    };

    return (
        <div className="relative   p-2"
            style={{
                backgroundImage: `url(${bg})`,
                width: "full",
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

                <div className="w-11/12 mx-auto bg-white mt-10 rounded-lg shadow-lg">
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
                                        <td className="flex flex-col gap-2">

                                            <Link to={`/scholarshipDetails/${scholarship._id}`}>
                                                <button className="flex gap-1 justify-center items-center rounded-md bg-blue-400 btn-ghost btn-sm">
                                                    <FaEye /> Details
                                                </button></Link>
                                            <button
                                                onClick={() => handleEdit(scholarship)}
                                                className="flex gap-1 justify-center items-center rounded-md bg-yellow-300 btn-ghost btn-sm"
                                            >
                                                <FaRegEdit /> Edit
                                            </button>
                                            <button
                                                onClick={() => handleCancel(scholarship._id)}
                                                className="flex gap-1 justify-center items-center rounded-md btn-ghost bg-red-500 btn-sm"
                                            >
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

            {/* Modal for editing scholarship */}

            {isModalOpen && selectedScholarship && (
                <div className="fixed inset-0 z-10 p-9 flex md:items-center mt-10 justify-center ">
                    <div className="bg-white overflow-y-auto max-h-[90vh] p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Edit Scholarship</h2>

                        <form
                            onSubmit={handleUpdateScholarship}
                            className="card-body"
                        >
                            <div className="form-control overflow-y-auto">
                                <label className="label">
                                    <span className="label-text text-xl">Scholarship Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="scholarshipName"
                                    placeholder="Scholarship Name"
                                    className="input input-bordered"
                                    required
                                    defaultValue={selectedScholarship.scholarshipName}
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-xl">University Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="University Name"
                                    name="universityName"
                                    className="input input-bordered"
                                    required
                                    defaultValue={selectedScholarship.universityName}
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-xl">University Image/Logo</span>
                                </label>
                                <input
                                    type="file"
                                    placeholder="University Image/Logo"
                                    name="universityImage"
                                    className="file-input file-input-bordered"

                                />

                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-xl">University Country</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="University Country"
                                    name="universityCountry"
                                    className="input input-bordered"
                                    required
                                    defaultValue={selectedScholarship.universityCountry} // 
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-xl">University City</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="University City"
                                    name="universityCity"
                                    className="input input-bordered"
                                    required
                                    defaultValue={selectedScholarship.universityCity} // 
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-xl">University World Rank</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="University World Rank"
                                    name="universityWorldRank"
                                    className="input input-bordered"
                                    required
                                    defaultValue={selectedScholarship.universityWorldRank} // 
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-xl">Subject Category</span>
                                </label>
                                <select
                                    name="subjectCategory"
                                    placeholder="Subject Category"
                                    className="input input-bordered"
                                    required
                                    defaultValue={selectedScholarship.subjectCategory} // 
                                >
                                    <option value="Agriculture">Agriculture</option>
                                    <option value="Engineering">Engineering</option>
                                    <option value="Doctor">Doctor</option>
                                </select>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-xl">Scholarship Category</span>
                                </label>
                                <select
                                    name="scholarshipCategory"
                                    placeholder="Scholarship Category"
                                    className="input input-bordered"
                                    required
                                    defaultValue={selectedScholarship.scholarshipCategory} // 
                                >
                                    <option value="Full fund">Full fund</option>
                                    <option value="Partial">Partial</option>
                                    <option value="Self-fund">Self-fund</option>
                                </select>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-xl">Degree</span>
                                </label>
                                <select
                                    name="degree"
                                    placeholder="Degree"
                                    className="input input-bordered"
                                    required
                                    defaultValue={selectedScholarship.degree}
                                >
                                    <option value="Diploma">Diploma</option>
                                    <option value="Bachelor">Bachelor</option>
                                    <option value="Masters">Masters</option>
                                </select>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-xl">Tuition Fees (Optional)</span>
                                </label>
                                <input
                                    type="text"
                                    name="tuitionFees"
                                    placeholder="Tuition Fees"
                                    className="input input-bordered"
                                    defaultValue={selectedScholarship.tuitionFees}
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-xl">Application Fees</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="Application Fees"
                                    name="applicationFees"
                                    className="input input-bordered"
                                    required
                                    defaultValue={selectedScholarship.applicationFees} // 
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-xl">Service Charge</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="Service Charge"
                                    name="serviceCharge"
                                    className="input input-bordered"
                                    required
                                    defaultValue={selectedScholarship.serviceCharge} // 
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-xl">Scholarship Description</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Scholarship Description"
                                    name="ScholarshipDescription"
                                    className="input input-bordered"
                                    required
                                />
                            </div>


                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-xl">Application Deadline</span>
                                </label>
                                <input
                                    type="date"
                                    name="applicationDeadline"
                                    className="input input-bordered"
                                    required
                                    defaultValue={selectedScholarship.applicationDeadline}
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-xl">Scholarship Post Date</span>
                                </label>
                                <input
                                    type="date"
                                    name="scholarshipPostDate"
                                    className="input input-bordered"
                                    required
                                    defaultValue={selectedScholarship.scholarshipPostDate}
                                />
                            </div>

                            <div className="form-control mt-6">
                                <button className="btn btn-primary hover:bg-slate-500 bg-[#162e40] text-white text-xl">
                                    Update Scholarship
                                </button>
                            </div>
                        </form>
                        <button
                            className="btn-neutral btn "
                            onClick={() => setIsModalOpen(false)}
                        >
                            Close
                        </button>

                    </div>
                </div>
            )}


        </div>
    );
};

export default ManageScholarship;

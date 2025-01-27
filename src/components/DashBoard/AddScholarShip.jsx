import React, { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import bg from '../../assets/img/9082953.jpg';
import UseAxiosPublic from '../../hooks/UseAxiosPublic';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';
import Swal from 'sweetalert2';
const imgHostingKey = import.meta.env.VITE_imgHostingKey;
const imgHostingApi = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`
const AddScholarship = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = UseAxiosPublic();
    const axiosSecure = UseAxiosSecure();

    const handleAddScholarship = async (e) => {
        e.preventDefault();
        const form = e.target;

        const imageFile = form.universityImage.files[0];
        const formData = new FormData();
        formData.append('image', imageFile);

        try {
            const imgResponse = await axiosPublic.post(imgHostingApi, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (imgResponse.data.success) {
                const imageUrl = imgResponse.data.data.display_url;
                const scholarshipData = {
                    scholarshipName: form.scholarshipName.value,
                    universityName: form.universityName.value,
                    universityImage: imageUrl,
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

                // console.log(scholarshipData);
                axiosSecure.post('/allScholarship', scholarshipData)
                    .then(res => {
                        if (res.data.insertedId) {

                            Swal.fire({
                                title: "Scholarship Added!",
                                text: "The scholarship has been successfully added.",
                                icon: "success"
                            });


                        }
                    })

            } else {
                console.error('Image upload failed');
            }
        } catch (error) {
            console.error('An error occurred during image upload:', error);
        }
    };


    return (
        <div
            className="relative min-h-screen p-3"
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
                    Add a New Scholarship
                </h1>

                <div className="md:w-2/3 mx-auto bg-white mt-10 p-6 rounded-lg shadow-lg">
                    <form
                        onSubmit={handleAddScholarship}
                        className="card-body"

                    >
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-xl">Scholarship Name</span>
                            </label>
                            <input
                                type="text"
                                name="scholarshipName"
                                placeholder="Scholarship Name"
                                className="input input-bordered"
                                required
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
                                required
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
                            />
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn btn-primary hover:bg-slate-500 bg-[#162e40] text-white text-xl">
                                Add Scholarship
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddScholarship;

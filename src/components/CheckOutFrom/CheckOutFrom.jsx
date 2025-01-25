import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';
import { AuthContext } from '../../provider/AuthProvider';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import UseAxiosPublic from '../../hooks/UseAxiosPublic';
import { useNavigate } from 'react-router-dom';
const imgHostingKey = import.meta.env.VITE_imgHostingKey;
const imgHostingApi = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`

const CheckOutFrom = ({ Scholarship }) => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate()
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState("");
    const [transactionId, setTransactionId] = useState('');
    const [isProcessing, setIsProcessing] = useState(false); // Loading state
    const axiosSecure = UseAxiosSecure();
    const stripe = useStripe();
    const elements = useElements();
    const [modalOpen, setModalOpen] = useState(false)
    const axiosPublic = UseAxiosPublic();
    const price = parseInt(Scholarship.applicationFees);
    const { data: userDetail = [] } = useQuery({
        queryKey: ['user.email'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/normalUsers/${user.email}`)
            return res.data;
        }
    })
    console.log('from mongo', userDetail)
    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-checkout-session', { price: price })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                });
        }
    }, [axiosSecure, price]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements || isProcessing) return;

        setIsProcessing(true); // Disable the button

        const card = elements.getElement(CardElement);
        if (card == null) {
            setIsProcessing(false);
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            toast.error(error.message);
            setError(error.message);
            setIsProcessing(false);
            return;
        } else {
            setError('');
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous',
                },
            },
        });

        if (confirmError) {
            console.log('Confirm error:', confirmError);
            toast.error(confirmError.message);
            setIsProcessing(false);
            return;
        }

        if (paymentIntent?.status === 'succeeded') {
            console.log('Transaction successful:', paymentIntent.id);
            setTransactionId(paymentIntent.id);

            setModalOpen(true)

            Swal.fire({
                title: 'Payment Successful!',
                text: `Transaction ID: ${paymentIntent.id}`,
                icon: 'success',
            });
        }

        setIsProcessing(false);
    };
    const handleApplySubmit = async (e) => {
        e.preventDefault();

        const form = e.target;
        const imageFile = e.target.userImage.files[0];


        try {

            const formData = new FormData();
            formData.append('image', imageFile);


            const imgResponse = await axiosPublic.post(imgHostingApi, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });


            if (imgResponse.data.success) {
                const imageUrl = imgResponse.data.data.display_url;
                const currentDate = new Date().toISOString();

                const applicationData = {
                    phone: form.phone.value,
                    photo: imageUrl,
                    address: form.address.value,
                    gender: form.gender.value,
                    degree: form.degree.value,
                    sscResult: form.sscResult.value,
                    hscResult: form.hscResult.value,
                    studyGap: form.studyGap.value,
                    universityName: Scholarship.universityName,
                    scholarshipCategory: Scholarship.scholarshipCategory,
                    subjectCategory: Scholarship.subjectCategory,
                    userName: user.displayName,
                    userMail: user.email,
                    userId: userDetail._id,
                    Status: "pending",
                    universityAddress: Scholarship.universityCountry,
                    applicationFees: Scholarship.applicationFees,
                    serviceCharge: Scholarship.serviceCharge,
                    scholarshipName: Scholarship.scholarshipName,
                    scholarshipId: Scholarship._id,
                    applicationDate: currentDate
                };

                console.log('Application Data with Uploaded Image URL:', applicationData);

                axiosSecure.post('/appliedScholarships', applicationData)
                    .then(res => {
                        if (res.data.insertedId) {
                            toast.success('Your application has been submitted successfully!')
                            setModalOpen(false)



                        }
                        // navigate('/dashboard')
                    })
            } else {
                console.error('Image upload failed:', imgResponse.data.error.message);
            }
        } catch (error) {
            console.error('Error during image upload:', error.message);
        }
    };



    return (
        <div>
            <form
                onSubmit={handleSubmit}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    maxWidth: '400px',
                    margin: '0 auto',
                    padding: '16px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    backgroundColor: '#f7fafc',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                }}
            >
                <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#2d3748', textAlign: 'center' }}>
                    Payment Details
                </h2>
                <div
                    style={{
                        padding: '12px',
                        border: '1px solid #e2e8f0',
                        borderRadius: '6px',
                        backgroundColor: '#ffffff',
                    }}
                >
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#2d3748',
                                    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                                    '::placeholder': {
                                        color: '#a0aec0',
                                    },
                                },
                                invalid: {
                                    color: '#e53e3e',
                                },
                            },
                        }}
                    />
                </div>
                <button
                    type="submit"
                    disabled={!stripe || !clientSecret || isProcessing}
                    className="btn-outline p-2 px-4 mt-3 border-4 btn border-x-0"
                    style={{
                        backgroundColor: isProcessing ? '#a0aec0' : '#3182ce',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '12px',
                        fontSize: '16px',
                        fontWeight: '500',
                        cursor: isProcessing ? 'not-allowed' : 'pointer',
                        textAlign: 'center',
                        transition: 'background-color 0.3s',
                    }}
                >
                    {isProcessing ? 'Processing...' : 'Pay'}
                </button>
                <p className="pt-3 text-red-600">{error}</p>
                {transactionId && (
                    <p>
                        Your Transaction ID: <span className="text-green-500">{transactionId}</span>
                    </p>
                )}
            </form>
            {modalOpen && (
                <div className="fixed inset-0 z-50 p-14  flex md:items-center bg-black bg-opacity-45 justify-center">
                    <div className="bg-white overflow-y-auto max-h-[90vh] p-8 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-6 text-center">Applicant Information</h2>

                        <form onSubmit={handleApplySubmit} className="space-y-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-xl">Phone Number</span>
                                </label>
                                <input
                                    type="number"
                                    name="phone"
                                    placeholder="Phone number"
                                    className="input input-bordered w-full"
                                    required
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
                                    required
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-xl">Address</span>
                                </label>
                                <textarea
                                    name="address"
                                    placeholder="Address (Village, District, Country)"
                                    className="textarea textarea-bordered w-full"
                                    required
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-xl">Gender</span>
                                </label>
                                <select
                                    name="gender"
                                    className="select select-bordered w-full"
                                    required
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
                                    className="select select-bordered w-full"
                                    required
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
                                    placeholder="SSC Result "
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-xl">HSC Result</span>
                                </label>
                                <input
                                    type="text"
                                    name="hscResult"
                                    placeholder="HSC Result "
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-xl">Study Gap</span>
                                </label>
                                <select
                                    name="studyGap"
                                    className="select select-bordered w-full"
                                >
                                    <option value="">Study Gap (optional)</option>
                                    <option value="0">1 years</option>
                                    <option value="1">2 year</option>
                                    <option value="2">3 years</option>
                                </select>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-xl">University Name</span>
                                </label>
                                <input
                                    type="text"
                                    value={Scholarship.universityName}
                                    readOnly
                                    className="input input-bordered w-full"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-xl">Scholarship Category</span>
                                </label>
                                <input
                                    type="text"
                                    value={Scholarship.scholarshipCategory}
                                    readOnly
                                    className="input input-bordered w-full"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-xl">Subject Category</span>
                                </label>
                                <input
                                    type="text"
                                    value={Scholarship.subjectCategory}
                                    readOnly
                                    className="input input-bordered w-full"
                                />
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

    );
};



export default CheckOutFrom;
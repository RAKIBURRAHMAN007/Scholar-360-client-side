import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckOutFrom from '../CheckOutFrom/CheckOutFrom';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import UseAxiosPublic from '../../hooks/UseAxiosPublic';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);
const Payment = () => {
    const { id } = useParams();
    const axiosPublic = UseAxiosPublic();


    const { data: Scholarship = [] } = useQuery({
        queryKey: ['Scholarship', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/allScholarships/${id}`);
            return res.data;
        },
    });


    return (
        <div className='w-11/12 mx-auto mt-28 mb-20'>
            <h1 className="text-center font-bold md:text-3xl mb-5 text-xl text-[#2c3792]">
                Pay Application Fee for <br /> {Scholarship.scholarshipName}
            </h1>
            <p className="text-center mb-10">
                Application Fee: <strong>${Scholarship.applicationFees}</strong>
            </p>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckOutFrom Scholarship={Scholarship}></CheckOutFrom>

                </Elements>

            </div>

        </div>
    );
};

export default Payment;
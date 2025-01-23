import { useQuery } from '@tanstack/react-query';
import React from 'react';
import UseAxiosPublic from '../../hooks/UseAxiosPublic';
import { useParams } from 'react-router-dom';

const ScholarshipDetails = () => {
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
        <div className="w-11/12 mx-auto mt-28 mb-16">

            <div className="text-center mb-8">
                <img
                    src={Scholarship.universityImage}
                    alt={Scholarship.universityName}
                    className="mx-auto w-36 h-36 border mb-4"
                />
                <h1 className="text-3xl font-bold">{Scholarship.scholarshipName}</h1>
                <p className="text-xl font-semibold text-gray-600">{Scholarship.universityName}</p>
                <p className="text-lg text-gray-500">
                    {Scholarship.universityCity}, {Scholarship.universityCountry}
                </p>
            </div>


            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 text-left border-r border-gray-300">Field</th> {/* Border added here */}
                            <th className="py-2 px-4 text-left">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b">
                            <td className="py-2 px-4 font-semibold border-r border-gray-300">Scholarship Category</td> {/* Border added here */}
                            <td className="py-2 px-4">{Scholarship.scholarshipCategory}</td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-2 px-4 font-semibold border-r border-gray-300">Subject Category</td> {/* Border added here */}
                            <td className="py-2 px-4">{Scholarship.subjectCategory}</td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-2 px-4 font-semibold border-r border-gray-300">Degree</td> {/* Border added here */}
                            <td className="py-2 px-4">{Scholarship.degree}</td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-2 px-4 font-semibold border-r border-gray-300">Tuition Fees</td> {/* Border added here */}
                            <td className="py-2 px-4">${Scholarship.tuitionFees}</td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-2 px-4 font-semibold border-r border-gray-300">Application Deadline</td> {/* Border added here */}
                            <td className="py-2 px-4">{Scholarship.applicationDeadline}</td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-2 px-4 font-semibold border-r border-gray-300">Service Charge</td> {/* Border added here */}
                            <td className="py-2 px-4">${Scholarship.serviceCharge}</td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-2 px-4 font-semibold border-r border-gray-300">Application Fees</td> {/* Border added here */}
                            <td className="py-2 px-4">${Scholarship.applicationFees}</td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-2 px-4 font-semibold border-r border-gray-300">Post Date</td> {/* Border added here */}
                            <td className="py-2 px-4">{Scholarship.scholarshipPostDate}</td>
                        </tr>
                    </tbody>
                </table>
            </div>




            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-2">Scholarship Description</h2>
                <p className="text-lg text-justify">{Scholarship.ScholarshipDescription}</p>
            </div>


            <div className="mt-8 flex justify-center">
                <a
                    href={`mailto:${Scholarship.email}`}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg text-lg font-semibold hover:bg-blue-700"
                >
                    Apply for Scholarship
                </a>
            </div>
        </div>
    );
};

export default ScholarshipDetails;

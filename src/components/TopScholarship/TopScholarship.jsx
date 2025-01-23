import { useQuery } from '@tanstack/react-query';
import React from 'react';
import UseAxiosPublic from '../../hooks/UseAxiosPublic';
import ScholarshipCard from '../AllScholkarShip/ScholarshipCard';

const TopScholarship = () => {
    const axiosPublic = UseAxiosPublic()
    const {data :topScholarships=[]} = useQuery({
        queryKey: ['topScholarships'],
        queryFn: async()=>{
            const res = await axiosPublic.get('/topScholarships');
            return res.data
        }
    })
    return (
        <div className='w-11/12 mx-auto'>
            <h1 className="text-center font-bold md:text-3xl mb-5 text-xl text-[#2c3792]">
                Top Scholarships to Propel <br /> Your Future
            </h1>
            <p className="text-center mb-10">

                Unlock academic opportunities with scholarships that reward excellence and ease  <br className="md:block hidden" />  financial burdens, paving the way for success.
            </p>
            <div className="grid grid-cols-1 gap-6 lg:gap-5 md:grid-cols-2 lg:grid-cols-3">
                {
                    topScholarships.map(scholarship =><ScholarshipCard scholarship={scholarship}></ScholarshipCard> )
                }
            </div>


        </div>
    );
};

export default TopScholarship;
import React from 'react';
import bg from '../../assets/img/beautiful-business-woman-writing-something-notebook.jpg';
import applicationImg from '../../assets/img/scholarship-application-form-foundation-concept.jpg';

const HomeAboutUs = () => {
    return (
        <div
            className='bg-fixed p-6 w-full lg:h-[300px] mt-24 flex justify-center items-center'
            style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className='md:flex  justify-between items-center w-4/5 bg-white bg-opacity-75 p-5 rounded-lg'>
                <div className='w-full md:w-1/2 text-center md:text-left'>
                    <h1 className='text-2xl font-bold text-gray-800 mb-4'>
                        Discover Scholarships with Scholar 360
                    </h1>
                    <p className=''>
                        Scholar 360 is a comprehensive platform designed to help students
                        navigate the world of scholarships. Whether you’re seeking
                        financial aid for your education or simply exploring opportunities,
                        our user-friendly interface and powerful search features make it
                        easy to discover the best scholarships available.
                    </p>
                </div>
                <div className='w-full md:w-2/5 flex justify-center mt-4 md:mt-0'>
                    <img className='h-32 rounded-lg shadow-md' src={applicationImg} alt="Scholarship Application" />
                </div>
            </div>
        </div>
    );
};

export default HomeAboutUs;

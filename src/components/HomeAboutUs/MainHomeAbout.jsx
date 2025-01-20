import React from 'react';
import video from '../../assets/img/1477613_Education_People_3840x2160.mp4'
const MainHomeAbout = () => {
    return (
        <div className='space-y-8 w-11/12  mx-auto '>
            <h1 className='text-center font-bold md:text-3xl mb-10 text-xl text-[#2c3792]'>Bachelor's and Master's  Scholarships</h1>

            <div className='md:flex justify-between items-center w-full  space-y-4 md:space-y-0'>
                <div className='md:w-2/5'>
                    <video className="w-full object-cover h-[200px] md:h-[30vh] lg:h-[40vh]"
                        src={video}
                        autoPlay
                        loop
                        muted></video>

                </div>
                <div className='md:w-1/2'>
                    <p className=''>Pursue your academic dreams with our exclusive Bachelor's and Master's scholarships! We are committed to supporting ambitious students by offering financial assistance to help you focus on your education and achieve your career goals. Whether you're starting your undergraduate journey or advancing with a master's degree, our scholarships are designed to empower your academic growth and open doors to new opportunities. Don't let financial barriers hold you back—apply today and take a step closer to a brighter future!</p>

                </div>
            </div>

        </div>
    );
};

export default MainHomeAbout;
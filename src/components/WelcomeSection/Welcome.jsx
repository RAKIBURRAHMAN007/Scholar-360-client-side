import React from "react";
import img from '../../assets/img/Students-rafiki.png'
import { Link } from "react-router-dom";

const Welcome = () => {
    return (
        <div className="w-11/12 mx-auto mt-7 ">
            <div className="md:flex items-center justify-between p-2 bg-gray-50 mb-28">
                <div className="md:w-1/4">
                    <img src={img} alt="" />

                </div>
                <div className="md:w-1/2 space-y-2">
                    <h1 className="font-bold text-xl">Unlock Your Potential with a $5,000 Grant!</h1>
                    <p>Take the next step towards your dream career! Apply for our exclusive grant and receive financial support to study in your desired field. Don’t let anything hold you back—this is your moment to shine.</p>

                </div>
                <div className="md:w-1/5 ">
                    <Link to="/allScholarship" className="text-white mt-2">
                        <button className="btn text-white bg-[#2c3792]  border-white hover:text-black">Apply Now</button>
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default Welcome;

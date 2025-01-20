import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import img1 from "../../assets/img/banner1.jpg";
import img2 from "../../assets/img/banner2.jpg";

import video from '../../assets/img/1477627_Education_People_3840x2160.mp4';

const Banner = () => {
    return (
        <div className="mb-2">
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 3800,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                {/* Slide 1 - Image */}
                <SwiperSlide>
                    <div className="w-full">
                        <video
                            className="w-full object-cover h-[200px] md:h-[60vh] lg:h-[79vh]"
                            src={video}
                            autoPlay
                            loop
                            muted

                        />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative w-full">
                        <img className="w-full object-cover h-[200px] md:h-[60vh] lg:h-[79vh]" src={img1} alt="Banner 1" />
                        <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/50 text-white px-4 text-center">
                            <h2 className="text-lg md:text-4xl font-semibold mb-2 md:mb-4">Unlock Your Future</h2>
                            <p className="text-xs md:text-lg leading-tight md:leading-relaxed mb-4 md:mb-6">
                                Explore endless opportunities with our exclusive scholarship programs. Let us help you achieve your dreams.
                            </p>
                            <button className="bg-[#2c3792] hover:bg-[#1a256e] text-white font-medium text-sm md:text-base py-1 px-3 md:py-2 md:px-4 rounded">
                                <a href="/scholarships">Explore Scholarships</a>
                            </button>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slide 2 - Image */}
                <SwiperSlide>
                    <div className="relative w-full">
                        <img className="w-full object-cover h-[200px] md:h-[60vh] lg:h-[79vh]" src={img2} alt="Banner 2" />
                        <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/50 text-white px-4 text-center">
                            <h2 className="text-lg md:text-4xl font-semibold mb-2 md:mb-4">Study Abroad Made Affordable</h2>
                            <p className="text-xs md:text-lg leading-tight md:leading-relaxed mb-4 md:mb-6">
                                Grab a <span className='font-bold underline text-red-800'>30%</span> discount on scholarship processing fees and take the first step toward your dream education.
                            </p>
                            <button className="bg-[#2c3792] hover:bg-[#1a256e] text-white font-medium text-sm md:text-base py-1 px-3 md:py-2 md:px-4 rounded">
                                <a href="/discounts">Claim Your Discount</a>
                            </button>
                        </div>
                    </div>
                </SwiperSlide>




            </Swiper>
        </div>
    );
};

export default Banner;

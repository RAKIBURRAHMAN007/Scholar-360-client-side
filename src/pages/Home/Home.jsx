import React from 'react';
import Banner from '../../components/Banner/Bannner';
import Welcome from '../../components/WelcomeSection/Welcome';
import HomeAboutUs from '../../components/HomeAboutUs/HomeAboutUs';
import MainHomeAbout from '../../components/HomeAboutUs/MainHomeAbout';
import CountUp from '../../components/CountUp/CountUpStat';


const Home = () => {
    return (
        <div className='space-y-36'>
            <Banner></Banner>
            <HomeAboutUs></HomeAboutUs>
            <MainHomeAbout></MainHomeAbout>
            <CountUp></CountUp>
            <Welcome></Welcome>
        </div>
    );
};

export default Home;
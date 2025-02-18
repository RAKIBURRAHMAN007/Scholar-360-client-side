import React from "react";
import Banner from "../../components/Banner/Bannner";
import Welcome from "../../components/WelcomeSection/Welcome";
import HomeAboutUs from "../../components/HomeAboutUs/HomeAboutUs";
import MainHomeAbout from "../../components/HomeAboutUs/MainHomeAbout";
import CountUp from "../../components/CountUp/CountUpStat";
import TopScholarship from "../../components/TopScholarship/Topscholarship";
import SubscribeSection from "../../components/Subscribe/SubscribeSection";
import Qna from "../../components/Qna/Qna";
import OfferMarquee from "../../components/Offer/Offer";

const Home = () => {
  return (
    <div className="space-y-36">
      <Banner></Banner>

      <HomeAboutUs></HomeAboutUs>
      <OfferMarquee></OfferMarquee>
      <TopScholarship></TopScholarship>
      <MainHomeAbout></MainHomeAbout>
      <CountUp></CountUp>
      <Welcome></Welcome>
      <Qna></Qna>
      <SubscribeSection></SubscribeSection>
    </div>
  );
};

export default Home;

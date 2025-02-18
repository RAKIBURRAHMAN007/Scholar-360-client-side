import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";

const OfferMarquee = () => {
  return (
    <div className="w-11/12 mx-auto">
      <div className="flex gap-2 items-center bg-base-200 p-2">
        <p className="bg-[#2c3792] text-base-100 px-3 py-1">Special Offers</p>
        <Marquee pauseOnHover={true} speed={100} className="space-x-10">
          <Link to="/allScholarship">
            🎉 50% Off on all Scholarships! Apply Now!
          </Link>
          <Link to="/allScholarship">
            💥 Limited Time Offer - Get Your Scholarship Today!
          </Link>
          <Link to="/allScholarship">
            🌟 Don’t Miss Out - Apply for Multiple Scholarships!
          </Link>
        </Marquee>
      </div>
    </div>
  );
};

export default OfferMarquee;

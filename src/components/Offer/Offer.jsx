import { useContext } from "react";
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../provider/ThemeProvider";

const OfferMarquee = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className="w-11/12 mx-auto">
      <div
        className={`flex gap-2 items-center  p-2 ${
          theme === "dark" ? "bg-[#0a0d23]" : "bg-base-200"
        }`}
      >
        <p className="bg-[#2c3792] text-base-100 px-3 py-1 ">Special Offers</p>
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

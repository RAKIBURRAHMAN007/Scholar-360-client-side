import React, { useContext } from "react";
import logo from "../../assets/img/1.png";
import { ThemeContext } from "../../provider/ThemeProvider";

const Footer = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className="mt-16">
      <footer className={theme === "dark" ? "bg-gray-950 " : "bg-gray-50"}>
        <div className="container mx-auto py-7 px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          <div>
            <div className="text-[#2c3792] font-bold text-lg mb-4">
              <img className="w-24" src={logo} alt="Scholar360 Logo" />
            </div>
            <p
              className={`text-sm  ${
                theme === "dark" ? "text-white" : "text-gray-600"
              }`}
            >
              Find and Apply for Scholarships
            </p>
            <p
              className={`text-sm  ${
                theme === "dark" ? "text-white" : "text-gray-500"
              } mt-2`}
            >
              Scholar360, 2025.
            </p>
          </div>

          <div>
            <h3
              className={`font-semibold  ${
                theme === "dark" ? "text-white" : "text-gray-700"
              } mb-4`}
            >
              Scholarships
            </h3>
            <ul
              className={`space-y-2 text-sm ${
                theme === "dark" ? "text-white" : "text-gray-600"
              }`}
            >
              <li>
                <a href="/scholarships" className="hover:text-[#2c3792]">
                  Available Scholarships
                </a>
              </li>
              <li>
                <a href="/how-to-apply" className="hover:text-[#2c3792]">
                  How to Apply
                </a>
              </li>
              <li>
                <a href="/scholarship-tips" className="hover:text-[#2c3792]">
                  Scholarship Tips
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3
              className={`font-semibold  ${
                theme === "dark" ? "text-white" : "text-gray-700"
              } mb-4`}
            >
              About
            </h3>
            <ul
              className={`space-y-2 text-sm ${
                theme === "dark" ? "text-white" : "text-gray-600"
              }`}
            >
              <li>
                <a href="/about" className="hover:text-[#2c3792]">
                  About Us
                </a>
              </li>
              <li>
                <a href="/team" className="hover:text-[#2c3792]">
                  Our Team
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-[#2c3792]">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3
              className={`font-semibold  ${
                theme === "dark" ? "text-white" : "text-gray-700"
              } mb-4`}
            >
              Resources
            </h3>
            <ul
              className={`space-y-2 text-sm ${
                theme === "dark" ? "text-white" : "text-gray-600"
              }`}
            >
              <li>
                <a href="/blog" className="hover:text-[#2c3792]">
                  Scholarship Blog
                </a>
              </li>
              <li>
                <a href="/faqs" className="hover:text-[#2c3792]">
                  FAQs
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-[#2c3792]">
                  Terms & Conditions
                </a>
              </li>
            </ul>
            <div className="flex justify-center md:justify-normal space-x-4 mt-4">
              <a href="https://www.facebook.com/rakiburrahman.ratul.14/?_rdr">
                <img
                  className="w-14"
                  src="https://img.icons8.com/?size=100&id=uLWV5A9vXIPu&format=png&color=000000"
                  alt="Facebook"
                />
              </a>
              <a href="https://x.com/Ratul31363937">
                <img
                  className="w-14"
                  src="https://img.icons8.com/?size=100&id=yoQabS8l0qpr&format=png&color=000000"
                  alt="X (formerly Twitter)"
                />
              </a>
              <a href="https://github.com/RAKIBURRAHMAN007">
                <img
                  className="w-14"
                  src="https://img.icons8.com/?size=100&id=3tC9EQumUAuq&format=png&color=000000"
                  alt="GitHub"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="bg-[#2c3792] text-white py-4 mt-8">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-center">
              Copyright © {new Date().getFullYear()} - All rights reserved by
              Rakibur Rahman Ratul
            </p>
            <div className="flex space-x-4 mt-2 md:mt-0 text-sm">
              <a href="/terms-of-service" className="hover:underline">
                Terms of Service
              </a>
              <a href="/privacy-policy" className="hover:underline">
                Privacy Policy
              </a>
              <a href="/cookies" className="hover:underline">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

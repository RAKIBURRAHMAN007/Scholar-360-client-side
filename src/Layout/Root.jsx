import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../sharedComponent/NavBar";
import Footer from "../components/Footer/footer";
import { ToastContainer } from "react-toastify";
import { ThemeContext } from "../provider/ThemeProvider";

const Root = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <div className={theme === "dark" ? "bg-black text-white" : ""}>
      <div className=" lg:min-h-screen min-h-svh flex flex-col">
        <NavBar />
        <div className="flex-grow">
          <Outlet />
        </div>
        <ToastContainer />
      </div>
      <Footer />
    </div>
  );
};

export default Root;

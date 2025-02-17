import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../sharedComponent/NavBar";
import Footer from "../components/Footer/footer";
import { ToastContainer } from "react-toastify";

const Root = () => {
  return (
    <div>
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

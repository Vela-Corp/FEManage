import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sliderbar from "./Sliderbar";
import { ToastContainer } from "react-toastify";

const LayoutAdmin = () => {
  return (
    <>
      <div className="container-layout w-full  mx-auto ">
        <ToastContainer />
        <div className="w-full xl:flex ">
          <div className="lg:block hidden container-slider__bar fixed w-64 pt-10 h-screen bg-white">
            <Sliderbar />
          </div>
          <div className="box-right float-right w-full bg-f0f0f0_bg pt-10 px-10 ml-64 min-h-screen">
            <div className="container-header ">
              <Header />
            </div>
            <div className="container-content">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutAdmin;

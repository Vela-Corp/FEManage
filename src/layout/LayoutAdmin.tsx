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
          <div className="lg:block hidden container-slider__bar fixed z-50 w-64 pt-10 h-screen bg-white shadow-lg">
            <Sliderbar />
          </div>
          <div className="box-right float-right w-full bg-slate-100 pt-5 px-5 lg:ml-64 min-h-screen">
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
